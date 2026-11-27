<?php
// Gedeelde functies voor de formulieren van FundamentPlus.
// Geheimen staan in private/fundamentplus-config.php, buiten de webroot (naast httpdocs).

declare(strict_types=1);

function fp_config(): array {
    static $cfg = null;
    if ($cfg !== null) return $cfg;
    $file = dirname(__DIR__, 2) . '/private/fundamentplus-config.php';
    $own = is_file($file) ? (require $file) : [];
    return $cfg = $own + [
        'to'        => 'info@fundamentplus.nl',
        'from'      => 'noreply@fundamentplus.nl',
        'from_name' => 'FundamentPlus website',
        'smtp'      => null, // ['host'=>'', 'port'=>587, 'user'=>'', 'pass'=>'', 'secure'=>'tls']
        'origins'   => ['https://fundamentplus.nl', 'https://www.fundamentplus.nl', 'https://new.fundamentplus.nl'],
    ];
}

function json_response(int $code, array $data): never {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function require_same_origin(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        $ref = $_SERVER['HTTP_REFERER'] ?? '';
        $origin = $ref ? (parse_url($ref, PHP_URL_SCHEME) . '://' . parse_url($ref, PHP_URL_HOST)) : '';
    }
    $host = 'https://' . ($_SERVER['HTTP_HOST'] ?? '');
    if ($origin !== $host && !in_array($origin, fp_config()['origins'], true)) {
        json_response(403, ['ok' => false, 'message' => 'Niet toegestaan.']);
    }
}

function rate_limit(string $key, int $max = 5, int $window = 600): void {
    $dir = sys_get_temp_dir() . '/fp-rl';
    if (!is_dir($dir)) @mkdir($dir, 0700, true);
    $file = $dir . '/' . hash('sha256', $key . ($_SERVER['REMOTE_ADDR'] ?? ''));
    $now = time();
    $hits = is_file($file) ? array_filter(array_map('intval', explode(',', (string) file_get_contents($file))), fn($t) => $t > $now - $window) : [];
    if (count($hits) >= $max) json_response(429, ['ok' => false, 'message' => 'Te veel verzoeken achter elkaar.']);
    $hits[] = $now;
    file_put_contents($file, implode(',', $hits), LOCK_EX);
}

function clean(string $v, int $max = 2000): string {
    $v = trim(str_replace(["\r\n", "\r"], "\n", $v));
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    return mb_substr($v, 0, $max);
}

function header_safe(string $v): string {
    return trim(preg_replace('/[\r\n]+/', ' ', $v) ?? '');
}

/**
 * Verstuurt een mail met HTML + platte tekst, optioneel met één bijlage.
 * Met SMTP-config via een eenvoudige SMTP-client, anders via mail() met -f.
 */
function send_mail(string $to, string $subject, string $html, string $text, ?string $replyTo = null, ?array $attachment = null): bool {
    $cfg = fp_config();
    $boundary = 'fp_' . bin2hex(random_bytes(8));
    $alt = 'alt_' . bin2hex(random_bytes(8));
    $from = header_safe($cfg['from']);
    $headers = [
        'From: ' . mb_encode_mimeheader($cfg['from_name']) . " <$from>",
        'MIME-Version: 1.0',
        'X-Mailer: FundamentPlus',
    ];
    if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) $headers[] = 'Reply-To: ' . header_safe($replyTo);

    $altPart = "--$alt\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($text))
        . "--$alt\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($html))
        . "--$alt--\r\n";

    if ($attachment) {
        $headers[] = "Content-Type: multipart/mixed; boundary=\"$boundary\"";
        $body = "--$boundary\r\nContent-Type: multipart/alternative; boundary=\"$alt\"\r\n\r\n$altPart"
            . "--$boundary\r\nContent-Type: {$attachment['type']}; name=\"{$attachment['name']}\"\r\nContent-Disposition: attachment; filename=\"{$attachment['name']}\"\r\nContent-Transfer-Encoding: base64\r\n\r\n"
            . chunk_split(base64_encode($attachment['data'])) . "--$boundary--\r\n";
    } else {
        $headers[] = "Content-Type: multipart/alternative; boundary=\"$alt\"";
        $body = $altPart;
    }
    $subj = mb_encode_mimeheader(header_safe($subject), 'UTF-8');

    if (!empty($cfg['smtp']['host'])) return smtp_send($cfg['smtp'], $from, $to, $subj, implode("\r\n", $headers), $body);
    return mail($to, $subj, $body, implode("\r\n", $headers), '-f' . $from);
}

function smtp_send(array $s, string $from, string $to, string $subject, string $headers, string $body): bool {
    $host = ($s['secure'] ?? 'tls') === 'ssl' ? 'ssl://' . $s['host'] : $s['host'];
    $fp = @stream_socket_client($host . ':' . ($s['port'] ?? 587), $errno, $err, 15);
    if (!$fp) return false;
    $read = function () use ($fp) { $r = ''; while (($l = fgets($fp, 515)) !== false) { $r .= $l; if (($l[3] ?? '') === ' ') break; } return $r; };
    $cmd = function (string $c, string $expect) use ($fp, $read) { fwrite($fp, $c . "\r\n"); return str_starts_with($read(), $expect); };
    $read();
    $cmd('EHLO ' . ($_SERVER['HTTP_HOST'] ?? 'localhost'), '250');
    if (($s['secure'] ?? 'tls') === 'tls') {
        if (!$cmd('STARTTLS', '220')) return false;
        stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        $cmd('EHLO ' . ($_SERVER['HTTP_HOST'] ?? 'localhost'), '250');
    }
    if (!$cmd('AUTH LOGIN', '334') || !$cmd(base64_encode($s['user']), '334') || !$cmd(base64_encode($s['pass']), '235')) return false;
    if (!$cmd("MAIL FROM:<$from>", '250') || !$cmd("RCPT TO:<$to>", '25') || !$cmd('DATA', '354')) return false;
    $data = "To: $to\r\nSubject: $subject\r\nDate: " . date('r') . "\r\n$headers\r\n\r\n" . preg_replace('/^\./m', '..', $body);
    $ok = $cmd($data . "\r\n.", '250');
    $cmd('QUIT', '221');
    fclose($fp);
    return $ok;
}
