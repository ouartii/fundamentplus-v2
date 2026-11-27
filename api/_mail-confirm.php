<?php
// Gebrande bevestigingsmail in de huisstijl van FundamentPlus.
declare(strict_types=1);

function fp_confirm_mail(string $voornaam, string $kind): array {
    $n = htmlspecialchars($voornaam ?: 'daar');
    $intro = [
        'contact'      => 'Bedankt voor je bericht. We hebben het goed ontvangen.',
        'aanmelden'    => 'Bedankt voor je aanmelding. We hebben hem goed ontvangen.',
        'sollicitatie' => 'Bedankt voor je sollicitatie en je interesse in FundamentPlus.',
        'klacht'       => 'We hebben je klacht ontvangen. Fijn dat je het ons laat weten. Je krijgt binnen 3 weken een bevestiging van de directie.',
    ][$kind] ?? 'Bedankt voor je bericht.';
    $steps = [
        ['1', 'We lezen je bericht', 'Ons team bekijkt het zorgvuldig.'],
        ['2', 'We nemen contact op', 'Je hoort zo snel mogelijk van ons, telefonisch of per e-mail.'],
        ['3', 'Samen verder', 'We plannen een gesprek en kijken wat er nodig is.'],
    ];
    $colors = ['#9D258F', '#FF8804', '#00AAED'];
    $stepsHtml = '';
    foreach ($steps as $i => [$num, $t, $d]) {
        $stepsHtml .= '<tr><td width="44" valign="top" style="padding:0 0 16px"><div style="width:32px;height:32px;border-radius:16px;background:' . $colors[$i] . ';color:#ffffff;font:bold 15px/32px Arial,sans-serif;text-align:center">' . $num . '</div></td>'
            . '<td valign="top" style="padding:4px 0 16px;font:15px/1.5 Arial,sans-serif;color:#4A4552"><strong style="color:#24202A">' . $t . '</strong><br>' . $d . '</td></tr>';
    }
    $html = '<!doctype html><html lang="nl"><body style="margin:0;background:#FFFAF5">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FFFAF5"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:24px">
<tr><td style="padding:32px 32px 8px"><img src="https://fundamentplus.nl/images/logo.png" width="200" alt="FundamentPlus" style="display:block;width:200px;height:auto"></td></tr>
<tr><td style="padding:16px 32px 0;font:bold 26px/1.25 Arial,sans-serif;color:#24202A">Hoi ' . $n . ',</td></tr>
<tr><td style="padding:12px 32px 24px;font:16px/1.6 Arial,sans-serif;color:#4A4552">' . htmlspecialchars($intro) . '</td></tr>
<tr><td style="padding:0 32px"><table role="presentation" cellpadding="0" cellspacing="0">' . $stepsHtml . '</table></td></tr>
<tr><td style="padding:8px 32px 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5E6F3;border-radius:16px"><tr><td style="padding:20px;font:15px/1.5 Arial,sans-serif;color:#24202A">
<strong>Is het dringend?</strong> Bel ons direct, er is altijd iemand bereikbaar.<br><br>
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#9D258F;border-radius:24px"><a href="tel:+31207370905" style="display:inline-block;padding:12px 22px;font:bold 15px Arial,sans-serif;color:#ffffff;text-decoration:none">Bel (020) 737 09 05</a></td></tr></table>
</td></tr></table></td></tr>
<tr><td style="padding:0 32px 32px;font:13px/1.6 Arial,sans-serif;color:#6B6573">FundamentPlus · Pierre Cuypershof 20, 1067 LC Amsterdam · <a href="mailto:info@fundamentplus.nl" style="color:#9D258F">info@fundamentplus.nl</a><br><span style="color:#B45309;font-weight:bold">Van kwetsbaar naar kansrijk</span></td></tr>
</table></td></tr></table></body></html>';
    $text = "Hoi $voornaam,\n\n$intro\n\nWat gebeurt er nu?\n1. We lezen je bericht.\n2. We nemen zo snel mogelijk contact met je op.\n3. We plannen een gesprek en kijken wat er nodig is.\n\nDringend? Bel (020) 737 09 05.\n\nFundamentPlus\nPierre Cuypershof 20, 1067 LC Amsterdam\ninfo@fundamentplus.nl";
    return [$html, $text];
}
