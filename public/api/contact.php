<?php
// Verwerkt alle formulieren: contact, aanmelden, sollicitatie en klacht.
declare(strict_types=1);
require __DIR__ . '/_lib.php';
require __DIR__ . '/_mail-confirm.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') json_response(405, ['ok' => false, 'message' => 'Alleen POST.']);
require_same_origin();

// Honeypot: gevuld = stil succes
if (!empty($_POST['website'])) json_response(200, ['ok' => true]);
rate_limit('form', 5, 600);

$forms = [
    'contact'      => ['label' => 'Contactaanvraag', 'required' => ['voornaam', 'achternaam', 'email', 'bericht'],
                       'fields' => ['voornaam' => 'Voornaam', 'achternaam' => 'Achternaam', 'email' => 'E-mail', 'telefoon' => 'Telefoon', 'bericht' => 'Bericht']],
    'aanmelden'    => ['label' => 'Aanmelding', 'required' => ['voornaam', 'achternaam', 'telefoon', 'email'],
                       'fields' => ['voornaam' => 'Voornaam jongere', 'achternaam' => 'Achternaam jongere', 'geboortedatum' => 'Geboortedatum', 'telefoon' => 'Telefoon', 'email' => 'E-mail',
                                    'organisatie' => 'Organisatie', 'verwijzer' => 'Verwijzer', 'adres' => 'Adres', 'postcode' => 'Postcode', 'plaats' => 'Plaats', 'bericht' => 'Hulpvraag / bericht']],
    'sollicitatie' => ['label' => 'Sollicitatie', 'required' => ['voornaam', 'achternaam', 'email'],
                       'fields' => ['voornaam' => 'Voornaam', 'achternaam' => 'Achternaam', 'email' => 'E-mail', 'telefoon' => 'Telefoon', 'functie' => 'Functie', 'bericht' => 'Motivatie']],
    'klacht'       => ['label' => 'Klacht', 'required' => ['voornaam', 'achternaam', 'email', 'voor', 'bericht', 'akkoord'],
                       'fields' => ['voornaam' => 'Voornaam', 'achternaam' => 'Achternaam', 'email' => 'E-mail', 'telefoon' => 'Telefoon', 'adres' => 'Adres', 'postcode' => 'Postcode',
                                    'plaats' => 'Woonplaats', 'voor' => 'Ingevuld', 'bericht' => 'Klacht', 'gemeld' => 'Al gemeld bij', 'datum' => 'Datum', 'tijd' => 'Tijdstip',
                                    'vertrouwenspersoon' => 'Vertrouwenspersoon', 'oplossing' => 'Gewenste oplossing', 'akkoord' => 'Akkoord privacybeleid']],
];

$kind = (string) ($_POST['form'] ?? 'contact');
if (!isset($forms[$kind])) json_response(400, ['ok' => false, 'message' => 'Onbekend formulier.']);
$form = $forms[$kind];

$data = [];
foreach ($form['fields'] as $key => $label) {
    $data[$key] = clean((string) ($_POST[$key] ?? ''), $key === 'bericht' || $key === 'oplossing' ? 5000 : 200);
}
$errors = [];
foreach ($form['required'] as $key) if ($data[$key] === '') $errors[$key] = 'Dit veld is verplicht.';
if ($data['email'] !== '' && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Vul een geldig e-mailadres in.';

// Cv-bijlage (alleen sollicitatie)
$attachment = null;
if ($kind === 'sollicitatie' && !empty($_FILES['cv']['tmp_name']) && is_uploaded_file($_FILES['cv']['tmp_name'])) {
    $f = $_FILES['cv'];
    $ext = strtolower(pathinfo((string) $f['name'], PATHINFO_EXTENSION));
    $types = ['pdf' => 'application/pdf', 'doc' => 'application/msword', 'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if ($f['size'] > 5 * 1024 * 1024) $errors['cv'] = 'Je cv is groter dan 5 MB.';
    elseif (!isset($types[$ext])) $errors['cv'] = 'Upload een pdf- of Word-bestand.';
    else $attachment = ['name' => 'cv-' . preg_replace('/[^a-z0-9]+/i', '-', $data['achternaam'] ?: 'kandidaat') . '.' . $ext, 'type' => $types[$ext], 'data' => (string) file_get_contents($f['tmp_name'])];
}

if ($errors) json_response(422, ['ok' => false, 'errors' => $errors, 'message' => 'Controleer de gemarkeerde velden.']);

// Mail naar FundamentPlus
$name = trim($data['voornaam'] . ' ' . $data['achternaam']);
$rows = '';
$text = "{$form['label']} via fundamentplus.nl\n\n";
foreach ($form['fields'] as $key => $label) {
    if ($data[$key] === '') continue;
    $rows .= '<tr><td style="padding:8px 12px;font-weight:bold;vertical-align:top;color:#24202A;white-space:nowrap">' . htmlspecialchars($label) . '</td><td style="padding:8px 12px;color:#4A4552">' . nl2br(htmlspecialchars($data[$key])) . '</td></tr>';
    $text .= "$label: {$data[$key]}\n";
}
$html = '<div style="font-family:Arial,sans-serif;font-size:15px"><h2 style="color:#9D258F">' . htmlspecialchars($form['label']) . '</h2><table cellpadding="0" cellspacing="0" style="border-collapse:collapse">' . $rows . '</table></div>';
$cfg = fp_config();
$sent = send_mail($cfg['to'], "{$form['label']}: $name", $html, $text, $data['email'], $attachment);
if (!$sent) json_response(500, ['ok' => false, 'message' => 'Het versturen is niet gelukt.']);

// Bevestiging naar de aanvrager (zonder het bericht terug te sturen)
[$cHtml, $cText] = fp_confirm_mail($data['voornaam'], $kind);
send_mail($data['email'], 'We hebben je bericht ontvangen | FundamentPlus', $cHtml, $cText);

json_response(200, ['ok' => true]);
