import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Quote } from "lucide-react";
import { WONEN, IMG, PHASES } from "../content/site";
import { useSEO, ORG, faqLD, crumbsLD, serviceLD } from "../lib/seo";
import { Eyebrow, PhasePath, Checklist, FAQ, TONE, Pic, Figures } from "../components/ui";
import { PageHero, ContactSection, Split } from "../components/PageTemplate";

export default function BegeleidWonen() {
  useSEO({
    title: "Begeleid Wonen Jongeren Amsterdam | 24-uurs | FundamentPlus",
    description:
      "Begeleid wonen voor jongeren in Amsterdam, Almere, Haarlem en omgeving. 24-uursbegeleiding in drie fases naar zelfstandigheid. Ook crisisplekken. Meld je aan.",
    path: "/begeleid-wonen/",
    jsonld: [ORG, crumbsLD("Woonbegeleiding", "/begeleid-wonen/"), serviceLD("Begeleid wonen voor jongeren", WONEN.lead, "/begeleid-wonen/"), faqLD(WONEN.faq)],
  });
  return (
    <>
      <PageHero crumb="Woonbegeleiding" eyebrow={WONEN.eyebrow} title={WONEN.title} lead={WONEN.lead} img={{ ...IMG.woonkamerGesprek, pos: "58% 50%" }} tone="sun" facts={["24-uursbegeleiding", "Ook crisisplekken", "Zelf aanmelden kan"]}>
        <Link to="/aanmelden/" className="btn-primary">Meld je aan <ArrowRight size={18} aria-hidden="true" /></Link>
        <a href="#contact" className="btn-ghost">Plan een kennismaking</a>
      </PageHero>

      <section className="bg-white py-20 sm:py-28" aria-labelledby="fases">
        <div className="wrap">
          <div className="max-w-2xl">
            <Eyebrow>Van kwetsbaar naar kansrijk</Eyebrow>
            <h2 id="fases" className="h-lg">{WONEN.phasesTitle}</h2>
            <p className="mt-5 text-[18px]">{WONEN.phasesLead}</p>
          </div>
          <div className="mt-14"><PhasePath phases={PHASES} /></div>
        </div>
      </section>

      <Split img={IMG.thuis} tint="">
        <Eyebrow>Wat ons anders maakt</Eyebrow>
        <h2 className="h-lg">{WONEN.different.title}</h2>
        {WONEN.different.paras.map((p) => <p key={p} className="mt-5 text-[18px]">{p}</p>)}
        <a href="#contact" className="btn-primary mt-8">Plan een kennismaking <ArrowRight size={18} aria-hidden="true" /></a>
      </Split>

      <section className="bg-plum-soft py-20 sm:py-28" aria-labelledby="past">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>Check</Eyebrow>
            <h2 id="past" className="h-lg">{WONEN.fit.title}</h2>
            <p className="mt-5 text-[18px]">Begeleid wonen bij FundamentPlus past bij je als:</p>
          </div>
          <div className="card">
            <Checklist items={WONEN.fit.items} tone="plum" />
            <Link to="/aanmelden/" className="btn-plum mt-8">Plan een gesprek <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="vormen">
        <div className="wrap">
          <div className="max-w-2xl">
            <Eyebrow>Woonvormen</Eyebrow>
            <h2 id="vormen" className="h-lg">Zo ziet begeleid wonen bij ons eruit</h2>
            <p className="mt-5 text-[18px]">Bij alles helpen we je met je hulpvragen, zoals dagbesteding, dagritme en omgaan met wat lastig is. Gericht op zelfstandig wonen en een eigen toekomst.</p>
          </div>
          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {WONEN.forms.map((f) => (
              <li key={f.title} id={f.title === "Groepswonen" ? "groepswonen-kort" : undefined} className="card flex flex-col">
                <span aria-hidden="true" className={`h-2 w-14 rounded-full ${TONE[f.color].bg}`} />
                <h3 className="mt-6 text-[26px]">{f.title}</h3>
                <Checklist items={f.items} tone={f.color} className="mt-5" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-20 text-white/85 sm:py-28" aria-labelledby="locaties">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow light>Locaties</Eyebrow>
            <h2 id="locaties" className="h-lg !text-white">{WONEN.locationsTitle}</h2>
            <p className="mt-5 text-[18px]">Begeleid wonen in Amsterdam, Almere, Haarlem, Zwanenburg en Zaanstad. Woon je ergens anders? Aanmeldingen van buiten onze regio's zijn ook welkom.</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {WONEN.locations.map((l, i) => {
              const tones = ["plum", "berry", "sun", "sky", "plum"] as const;
              return (
                <li key={l.city} className={`flex gap-4 rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 ${i === 0 ? "sm:col-span-2" : ""}`}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full" style={{ background: TONE[tones[i]].hex }}>
                    <MapPin size={20} className="text-white" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-[22px] !text-white">{l.city}</h3>
                    <p className="mt-1">{l.setting}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Split id="groepswonen" img={IMG.kamer2} reverse frame="house" tint="bg-sun-soft">
        <Eyebrow>Groepswonen</Eyebrow>
        <h2 className="h-lg">{WONEN.group.title}</h2>
        <p className="mt-5 text-[18px]">{WONEN.group.text}</p>
        <Link to="/aanmelden/" className="btn-plum mt-8">Meld je aan <ArrowRight size={18} aria-hidden="true" /></Link>
      </Split>

      <section className="py-20 sm:py-28" aria-labelledby="verhaal">
        <div className="wrap">
          <figure className="relative grid overflow-hidden rounded-blob bg-white shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[280px]">
              <Pic img={IMG.kamer} sizes="(min-width:1024px) 520px, 100vw" className="absolute inset-0 h-full w-full" />
            </div>
            <div className="relative p-8 sm:p-12">
              <Figures className="absolute -right-8 -top-10 w-32 opacity-20" />
              <Eyebrow>Een verhaal uit de praktijk</Eyebrow>
              <h2 id="verhaal" className="h-md">{WONEN.story.title}</h2>
              <Quote size={36} className="mt-6 text-sun" aria-hidden="true" />
              <blockquote className="mt-3 space-y-4 text-[18px]">
                {WONEN.story.text.map((p) => <p key={p}>{p}</p>)}
              </blockquote>
              <figcaption className="mt-6 text-[15px] text-mute">Naam ingekort uit respect voor zijn privacy.</figcaption>
            </div>
          </figure>
        </div>
      </section>

      <FAQ items={WONEN.faq} />
      <ContactSection />
    </>
  );
}
