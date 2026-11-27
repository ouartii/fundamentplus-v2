import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin, MessageCircle, ExternalLink, Navigation } from "lucide-react";
import { OVER, WERKEN, CONTACT, AANMELDEN, KLACHT, JEUGDSTEM, IMG, PILLARS, SITE } from "../content/site";
import { useSEO, ORG, crumbsLD } from "../lib/seo";
import { Eyebrow, Pic, TONE, Figures, HouseFrame, Checklist } from "../components/ui";
import { PageHero, ContactSection, Crumbs } from "../components/PageTemplate";
import ContactForm from "../components/ContactForm";
import { track } from "../lib/analytics";

/* ---------- Over ons ---------- */
export function OverOns() {
  useSEO({
    title: "Over ons | Jeugdhulp met een stevig fundament | FundamentPlus",
    description: "FundamentPlus Jeugdhulp combineert innovatie met jarenlange ervaring in jeugdzorg en welzijnswerk. Maak kennis met onze visie en ons betrokken team.",
    path: "/over-ons/",
    jsonld: [ORG, crumbsLD("Over ons", "/over-ons/")],
  });
  return (
    <>
      <PageHero crumb="Over ons" eyebrow={OVER.eyebrow} title={OVER.title} lead={OVER.lead} img={IMG.team} tone="berry">
        <Link to="/werken-bij/" className="btn-primary">Werken bij ons <ArrowRight size={18} aria-hidden="true" /></Link>
        <a href="#contact" className="btn-ghost">Contact</a>
      </PageHero>
      <section className="bg-white py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <div className="space-y-5 text-[19px]">
            <Eyebrow>Wie we zijn</Eyebrow>
            {OVER.paras.map((p) => <p key={p}>{p}</p>)}
          </div>
          <Pic img={IMG.schilderwand} sizes="(min-width:1024px) 440px, 92vw" className="mx-auto aspect-[4/5] w-full max-w-[440px] rounded-blob" />
        </div>
      </section>
      <section className="py-20 sm:py-28" aria-labelledby="waarden">
        <div className="wrap">
          <Eyebrow>Waar we voor staan</Eyebrow>
          <h2 id="waarden" className="h-lg max-w-2xl">Onvoorwaardelijk, op maat en vernieuwend</h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p) => (
              <li key={p.title} className="card">
                <span aria-hidden="true" className={`block h-2 w-14 rounded-full ${TONE[p.color].bg}`} />
                <h3 className="mt-6 text-[24px]">{p.title}</h3>
                <p className="mt-3">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-plum-soft py-20 sm:py-24">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Samen sterk</Eyebrow>
            <h2 className="h-lg">Vier figuren, één huis</h2>
            <p className="mt-5 text-[18px]">
              Iedere jongere is anders. Samen met gezin, school en netwerk bouwen we onder één dak aan een stevig fundament. Van kwetsbaar naar kansrijk.
            </p>
          </div>
          <Figures className="mx-auto w-full max-w-[280px]" />
        </div>
      </section>
      <ContactSection />
    </>
  );
}

/* ---------- Werken bij ---------- */
export function WerkenBij() {
  useSEO({
    title: "Werken bij FundamentPlus | Vacatures Jeugdzorg Amsterdam",
    description: "Pedagogisch medewerker, woonbegeleider, ambulant hulpverlener of gedragswetenschapper in Amsterdam of Almere? Solliciteer bij FundamentPlus, parttime of fulltime.",
    path: "/werken-bij/",
    jsonld: [ORG, crumbsLD("Werken bij", "/werken-bij/")],
  });
  return (
    <>
      <PageHero crumb="Werken bij" eyebrow={WERKEN.eyebrow} title={WERKEN.title} lead={WERKEN.lead} img={{ ...IMG.gesprek, pos: "30% 40%" }} tone="sun" facts={["Parttime en fulltime", "Amsterdam en Almere"]}>
        <a href="#solliciteren" className="btn-primary">Solliciteer direct <ArrowRight size={18} aria-hidden="true" /></a>
      </PageHero>
      <section className="bg-white py-20 sm:py-28" aria-labelledby="functies">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>We zoeken</Eyebrow>
            <h2 id="functies" className="h-lg">Klaar om het verschil te maken?</h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {WERKEN.roles.map((r, i) => (
                <li key={r} className={`rounded-full px-4 py-2.5 font-display font-bold text-ink ${["bg-plum-soft", "bg-berry-soft", "bg-sun-soft", "bg-sky-soft"][i]}`}>{r}</li>
              ))}
            </ul>
            <p className="mt-5 font-semibold text-ink">{WERKEN.hours}</p>
          </div>
          <div>
            <h2 className="h-md">{WERKEN.where.title}</h2>
            <p className="mt-4 text-[18px]">{WERKEN.where.text}</p>
            <p className="mt-4">Vragen? Mail naar <a href={`mailto:${SITE.email}`} className="link">{SITE.email}</a>.</p>
          </div>
        </div>
      </section>
      <section id="solliciteren" className="py-20 sm:py-28" aria-labelledby="sollicitatie-titel">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Solliciteren</Eyebrow>
            <h2 id="sollicitatie-titel" className="h-lg">Word onze nieuwe collega</h2>
            <p className="mt-5 text-[18px]">Laat je gegevens achter en stuur je cv mee. We nemen zo snel mogelijk contact met je op.</p>
          </div>
          <div className="card"><ContactForm kind="sollicitatie" /></div>
        </div>
      </section>
    </>
  );
}

/* ---------- Contact ---------- */
export function Contact() {
  useSEO({
    title: "Contact | FundamentPlus Jeugdhulp Amsterdam",
    description: "Neem contact op met FundamentPlus: bel (020) 737 09 05, mail info@fundamentplus.nl of bezoek ons aan de Pierre Cuypershof 20 in Amsterdam.",
    path: "/contact/",
    jsonld: [ORG, crumbsLD("Contact", "/contact/")],
  });
  const items = [
    { icon: Phone, label: "Bel ons", value: SITE.phone, href: SITE.phoneHref, ev: "click_phone", tone: "plum" as const },
    { icon: Mail, label: "Mail ons", value: SITE.email, href: `mailto:${SITE.email}`, ev: "click_email", tone: "sky" as const },
    { icon: MapPin, label: "Bezoekadres", value: `${SITE.street}, ${SITE.postal} ${SITE.city}`, href: SITE.mapsUrl, ev: "", tone: "berry" as const },
  ];
  return (
    <>
      <section className="pb-20 pt-8 sm:pb-28 sm:pt-12">
        <div className="wrap">
          <Crumbs name="Contact" />
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Eyebrow>Contact</Eyebrow>
              <h1 className="h-xl">{CONTACT.title}</h1>
              <p className="lead mt-6">{CONTACT.lead}</p>
              <ul className="mt-10 space-y-4">
                {items.map(({ icon: Icon, ...i }) => (
                  <li key={i.label}>
                    <a href={i.href} onClick={() => i.ev && track(i.ev)} {...(i.ev ? {} : { target: "_blank", rel: "noopener" })} className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-soft transition hover:-translate-y-0.5">
                      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${TONE[i.tone].bg} text-white`}><Icon size={21} aria-hidden="true" /></span>
                      <span>
                        <span className="block text-[14px] font-bold uppercase tracking-wider text-mute">{i.label}</span>
                        <span className="font-display text-[19px] font-bold text-ink">{i.value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 overflow-hidden rounded-blob">
                <Pic img={IMG.locatie} sizes="(min-width:1024px) 480px, 92vw" className="aspect-[16/10] w-full" />
              </div>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener" className="link mt-4 inline-flex items-center gap-2">
                <Navigation size={16} aria-hidden="true" /> Plan je route
              </a>
            </div>
            <div className="card h-fit">
              <h2 className="h-md">Stuur ons een bericht</h2>
              <p className="mb-8 mt-3">We denken graag met je mee.</p>
              <ContactForm kind="contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Aanmelden ---------- */
export function Aanmelden() {
  useSEO({
    title: "Aanmelden | Begeleiding voor jongeren | FundamentPlus",
    description: "Meld een jongere aan bij FundamentPlus voor begeleid wonen, ambulante begeleiding of dagbesteding. Zelf aanmelden kan ook, zonder verwijzer.",
    path: "/aanmelden/",
    jsonld: [ORG, crumbsLD("Aanmelden", "/aanmelden/")],
  });
  const tones = ["plum", "sun", "sky"] as const;
  return (
    <section className="pb-20 pt-8 sm:pb-28 sm:pt-12">
      <div className="wrap">
        <Crumbs name="Aanmelden" />
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>Aanmelden</Eyebrow>
            <h1 className="h-xl">{AANMELDEN.title}</h1>
            <p className="lead mt-6">{AANMELDEN.lead}</p>
            <ol className="mt-10 space-y-4">
              {AANMELDEN.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-[18px] font-bold text-ink" style={{ background: TONE[tones[i]].hex, color: i === 0 ? "#fff" : undefined }}>{i + 1}</span>
                  <div>
                    <h2 className="text-[20px]">{s.title}</h2>
                    <p className="mt-1">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 rounded-3xl bg-plum-soft p-6">
              <p className="font-bold text-ink">Liever eerst even bellen?</p>
              <a href={SITE.phoneHref} onClick={() => track("click_phone")} className="mt-2 inline-flex items-center gap-2 font-display text-[22px] font-bold text-plum">
                <Phone size={20} aria-hidden="true" /> {SITE.phone}
              </a>
            </div>
          </div>
          <div className="card h-fit">
            <h2 className="h-md">Aanmeldformulier</h2>
            <p className="mb-8 mt-3">Velden met <span className="text-berry">*</span> zijn verplicht. Weet je iets niet? Laat het dan leeg.</p>
            <ContactForm kind="aanmelden" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Klachtenreglement ---------- */
export function Klachten() {
  useSEO({
    title: "Klachtenreglement | FundamentPlus",
    description: "Ontevreden over FundamentPlus? Lees hoe we klachten afhandelen, binnen welke termijnen, en dien je klacht in via het formulier of Klachtenportaal Zorg.",
    path: "/klachtenregelement/",
    jsonld: [ORG, crumbsLD("Klachtenreglement", "/klachtenregelement/")],
  });
  return (
    <>
      <PageHero crumb="Klachtenreglement" eyebrow="Klachten" title={KLACHT.title} lead={KLACHT.lead} tone="sky">
        <a href="#klacht-indienen" className="btn-primary">Klacht indienen <ArrowRight size={18} aria-hidden="true" /></a>
        <Link to="/jeugdstem/" className="btn-ghost">Hulp van een vertrouwenspersoon</Link>
      </PageHero>
      <section className="bg-white py-20 sm:py-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <h2 className="h-md">Zo gaan we met je klacht om</h2>
            <p className="mt-4 text-[18px]">{KLACHT.intro}</p>
            <ol className="mt-8 space-y-4">
              {KLACHT.rules.map((r, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-plum-soft font-display font-bold text-plum">{i + 1}</span>
                  <p className="pt-1">{r}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[15px] text-mute">{KLACHT.since}</p>
          </div>
          <aside className="h-fit rounded-blob bg-sky-soft p-8">
            <img src="/images/klachtenportaal-zorg.webp" alt="Klachtenportaal Zorg" width={300} height={36} loading="lazy" className="h-8 w-auto" />
            <h2 className="mt-6 text-[22px]">Onafhankelijke klachtencommissie</h2>
            <p className="mt-3">{KLACHT.external}</p>
            <ul className="mt-6 space-y-2">
              <li><a href={KLACHT.links.indienen} target="_blank" rel="noopener" className="link inline-flex items-center gap-2">Klacht indienen bij Klachtenportaal Zorg <ExternalLink size={15} aria-hidden="true" /></a></li>
              <li><a href={`mailto:${KLACHT.links.mail}`} className="link">{KLACHT.links.mail}</a></li>
              <li><a href={KLACHT.links.functionaris} target="_blank" rel="noopener" className="link inline-flex items-center gap-2">Onafhankelijke klachtenfunctionaris <ExternalLink size={15} aria-hidden="true" /></a></li>
            </ul>
          </aside>
        </div>
      </section>
      <section id="klacht-indienen" className="py-20 sm:py-28" aria-labelledby="klachtformulier">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Klachtenformulier</Eyebrow>
            <h2 id="klachtformulier" className="h-lg">Dien je klacht in</h2>
            <p className="mt-5 text-[18px]">Je klacht komt binnen bij de directie. Je krijgt binnen 3 weken een bevestiging.</p>
          </div>
          <div className="card"><ContactForm kind="klacht" /></div>
        </div>
      </section>
    </>
  );
}

/* ---------- JeugdStem ---------- */
export function Jeugdstem() {
  useSEO({
    title: "JeugdStem vertrouwenspersoon | FundamentPlus",
    description: "Vragen of een klacht over jeugdzorg? Een vertrouwenspersoon van JeugdStem helpt je gratis en onafhankelijk. Bel 088 555 1000 of chat via jeugdstem.nl.",
    path: "/jeugdstem/",
    jsonld: [ORG, crumbsLD("JeugdStem", "/jeugdstem/")],
  });
  return (
    <>
      <PageHero crumb="JeugdStem" eyebrow="Vertrouwenspersoon" title={JEUGDSTEM.title} lead={JEUGDSTEM.lead} tone="plum">
        <a href={JEUGDSTEM.phoneHref} className="btn-primary"><Phone size={18} aria-hidden="true" /> Bel gratis {JEUGDSTEM.phone}</a>
        <a href={JEUGDSTEM.url} target="_blank" rel="noopener" className="btn-ghost"><MessageCircle size={18} aria-hidden="true" /> Chat via jeugdstem.nl</a>
      </PageHero>
      <section className="bg-white py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-5 text-[18px]">
            <img src="/images/jeugdstem.webp" alt="JeugdStem" width={399} height={97} loading="lazy" className="h-12 w-auto" />
            {JEUGDSTEM.paras.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="rounded-blob bg-paper p-8">
            <h2 className="h-md">Een vertrouwenspersoon van JeugdStem</h2>
            <Checklist items={JEUGDSTEM.does} tone="sky" className="mt-6" />
            <p className="mt-8 font-bold text-ink">Zo bereik je JeugdStem</p>
            <p className="mt-2">Bel gratis: <a href={JEUGDSTEM.phoneHref} className="link">{JEUGDSTEM.phone}</a></p>
            <p className="mt-1">{JEUGDSTEM.chat}</p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Privacy ---------- */
export function Privacy() {
  useSEO({
    title: "Privacybeleid | FundamentPlus",
    description: "Lees hoe FundamentPlus omgaat met persoonsgegevens die je via de website deelt, welke cookies we gebruiken en wat je rechten zijn.",
    path: "/privacy/",
    jsonld: [crumbsLD("Privacybeleid", "/privacy/")],
  });
  const blocks: { h: string; p: string[] }[] = [
    { h: "Wie zijn wij?", p: [`FundamentPlus, ${SITE.street}, ${SITE.postal} ${SITE.city}, is verantwoordelijk voor de verwerking van persoonsgegevens via deze website. Je bereikt ons via ${SITE.email} of ${SITE.phone}.`] },
    { h: "Welke gegevens verwerken we?", p: ["Als je een formulier invult, verwerken we de gegevens die je zelf invult, zoals je naam, e-mailadres, telefoonnummer, adres en je bericht. Bij een aanmelding kan dat ook gaan om een geboortedatum en informatie over de hulpvraag. Bij een sollicitatie ontvangen we je cv."] },
    { h: "Waarvoor gebruiken we ze?", p: ["Alleen om je vraag, aanmelding, klacht of sollicitatie te behandelen en contact met je op te nemen. We verkopen je gegevens nooit en delen ze niet met derden voor hun eigen doeleinden."] },
    { h: "Hoe lang bewaren we ze?", p: ["We bewaren je gegevens niet langer dan nodig is voor het doel waarvoor je ze gaf, of zolang de wet dat voorschrijft. Sollicitatiegegevens verwijderen we na afloop van de procedure, tenzij je toestemming geeft om ze langer te bewaren."] },
    { h: "Cookies en statistieken", p: ["We gebruiken Google Analytics om te zien hoe de website wordt gebruikt, maar alleen als je daar in de cookiemelding akkoord op geeft. Je kunt je keuze altijd wijzigen door je browsercookies te wissen."] },
    { h: "Beveiliging", p: ["De website gebruikt een beveiligde verbinding (https). Formulieren worden verstuurd naar onze eigen server en daarvandaan per e-mail naar ons team."] },
    { h: "Je rechten", p: ["Je mag je gegevens inzien, laten aanpassen of laten verwijderen, en bezwaar maken tegen het gebruik ervan. Stuur hiervoor een e-mail naar " + SITE.email + ". Ben je het niet eens met hoe we met je gegevens omgaan? Dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens."] },
  ];
  return (
    <section className="pb-20 pt-8 sm:pb-28 sm:pt-12">
      <div className="wrap max-w-3xl">
        <Crumbs name="Privacybeleid" />
        <h1 className="h-xl">Privacybeleid</h1>
        <p className="lead mt-6">We gaan zorgvuldig om met de gegevens die je met ons deelt. Hier lees je wat we via deze website verwerken en waarom.</p>
        <div className="mt-12 space-y-10">
          {blocks.map((b) => (
            <div key={b.h}>
              <h2 className="h-md">{b.h}</h2>
              {b.p.map((p) => <p key={p} className="mt-3">{p}</p>)}
            </div>
          ))}
          <p className="text-[15px] text-mute">Laatst bijgewerkt: november 2026.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Bedankt ---------- */
export function Bedankt() {
  useSEO({ title: "Bedankt voor je bericht | FundamentPlus", description: "We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op.", path: "/bedankt/", noindex: true });
  const { state } = useLocation() as { state?: { name?: string; kind?: string } };
  const name = state?.name ? `, ${state.name}` : "";
  const steps = [
    { t: "We lezen je bericht", d: "Ons team bekijkt je bericht of aanmelding zorgvuldig." },
    { t: "We nemen contact op", d: "Je hoort zo snel mogelijk van ons, telefonisch of per e-mail." },
    { t: "Samen verder", d: "We plannen een kennismaking en kijken wat er nodig is." },
  ];
  return (
    <section className="py-20 sm:py-28">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow>Verstuurd</Eyebrow>
          <h1 className="h-xl">Bedankt{name}!</h1>
          <p className="lead mt-6">We hebben je bericht goed ontvangen. Je krijgt ook een bevestiging per e-mail.</p>
          <ol className="mt-10 space-y-5">
            {steps.map((s, i) => (
              <li key={s.t} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sun font-display font-bold text-ink">{i + 1}</span>
                <div><h2 className="text-[20px]">{s.t}</h2><p>{s.d}</p></div>
              </li>
            ))}
          </ol>
          <div className="mt-10 rounded-3xl bg-plum-soft p-6">
            <p className="font-bold text-ink">Is het dringend? Bel ons direct.</p>
            <a href={SITE.phoneHref} onClick={() => track("click_phone")} className="btn-plum mt-3"><Phone size={18} aria-hidden="true" /> {SITE.phone}</a>
          </div>
        </div>
        <HouseFrame img={IMG.kat} className="mx-auto w-full max-w-[420px]" />
      </div>
    </section>
  );
}

/* ---------- 404 ---------- */
export function NotFound() {
  useSEO({ title: "Pagina niet gevonden | FundamentPlus", description: "Deze pagina bestaat niet (meer).", path: "/404/", noindex: true });
  return (
    <section className="py-24 sm:py-32">
      <div className="wrap max-w-2xl text-center">
        <Figures className="mx-auto w-40" heights={[0.5, 0.3, 0.7, 0.6]} />
        <h1 className="h-xl mt-8">Deze pagina bestaat niet</h1>
        <p className="lead mt-5">Misschien is de pagina verhuisd. Ga terug naar de homepage of neem contact met ons op.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">Naar de homepage</Link>
          <Link to="/contact/" className="btn-ghost">Contact</Link>
        </div>
      </div>
    </section>
  );
}
