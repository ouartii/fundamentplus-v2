# FundamentPlus – nieuwe website (V1)

Redesign van new.fundamentplus.nl door WebTik. Zelfde pagina's en URL's, teksten ingekort en aangescherpt, echte foto's van FundamentPlus.

## Merkrichting
- **Doelgroep:** verwijzers (jeugdbescherming, wijkteams), ouders en jongeren zelf. Ze willen snel weten: past dit, is er plek, wie is er bereikbaar.
- **Persoonlijkheid:** warm, hoopvol en kleurrijk, maar volwassen en betrouwbaar.
- **Kleuren (uit het logo):** plum `#9D258F`, berry `#ED008C`, sun `#FF8804` (actieknoppen, met donkere tekst), sky `#00AAED`, ink `#24202A`, grijs woordmerk `#5B5B5B`, warme achtergrond `#FFFAF5`.
- **Letters:** Quicksand (koppen, rond en geometrisch zoals het woordmerk) + Nunito Sans (lezen). Zelf gehost.
- **Signature:** foto's in de huisvorm uit het logo, met de vier overlappende figuren erachter (multiply), en een fasepad waarin de figuren meegroeien van fase 1 naar 3: *van kwetsbaar naar kansrijk*.

## Ontwikkelen
```
npm ci
npm run dev
npm run build          # productie: prerender naar dist/ + sitemap.xml + robots.txt + 404.html
npm run build:preview  # alleen voor de claude.ai-preview (hash-routing)
```
Teksten: `src/content/site.ts`. Routes en sitemap: `src/routes.ts`.

## Formulieren
`public/api/contact.php` verwerkt contact, aanmelden, sollicitatie (met cv) en klacht. Mail naar info@fundamentplus.nl, met een gebrande bevestiging naar de aanvrager.
Zet in Plesk `private/fundamentplus-config.php` naast httpdocs (voorbeeld in `private-voorbeeld/`), eventueel met SMTP-gegevens. Geen wachtwoorden in de repo.

## Livegang
1. Repo onder ouartii, deploy via `.github/workflows/deploy.yml` naar branch `deploy`.
2. Plesk → Git → branch `deploy` → httpdocs (eerst leegmaken).
3. GA4-ID en Search Console-tag in `tracking.config.json` (de cookiemelding verschijnt pas als GA4 is ingevuld).
4. SPF/DKIM/DMARC voor fundamentplus.nl, formulieren testen, sitemap indienen.
