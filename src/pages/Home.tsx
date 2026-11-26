import { Link } from "react-router-dom";
import { ArrowRight, Moon, ShieldCheck } from "lucide-react";
import { HOME, IMG, PHASES, PILLARS, DAG } from "../content/site";
import { useSEO, ORG, WEBSITE, faqLD } from "../lib/seo";
import { Eyebrow, HouseFrame, Pic, PhasePath, FAQ, TONE, Checklist, useReveal } from "../components/ui";
import { ContactSection, Split } from "../components/PageTemplate";

function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-8 sm:pb-28 sm:pt-14">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-sun-soft blur-3xl" />
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <h1>
            <span className="mb-5 flex items-center gap-3 font-display text-[14px] font-bold uppercase tracking-[0.14em] text-stone">
              <span aria-hidden="true" className="inline-flex -space-x-1">
                {["#9D258F", "#ED008C", "#FF8804", "#00AAED"].map((c) => <span key={c} className="blend h-3 w-3 rounded-full" style={{ background: c }} />)}
              </span>
              {HOME.eyebrow}
            </span>
            <span className="h-xl block">
              Jij groeit, <span className="text-plum">wij begeleiden.</span>
            </span>
          </h1>
          <p className="lead mt-6 max-w-[52ch]">{HOME.lead}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">Plan een kennismaking <ArrowRight size={18} aria-hidden="true" /></a>
            <a href="#aanbod" className="btn-ghost">Ontdek onze begeleiding</a>
          </div>
          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 text-[15px] font-semibold text-ink">
            <li className="flex items-center gap-2"><Moon size={18} className="text-plum" aria-hidden="true" /> Altijd bereikbaar, ook 's nachts</li>
            <li className="flex items-center gap-2"><ShieldCheck size={18} className="text-sky-deep" aria-hidden="true" /> WTZI-erkend en ISO 9001</li>
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-[520px]">
          <HouseFrame img={IMG.woonkamerGesprek} eager sizes="(min-width:1024px) 520px, 92vw" />
          <p className="absolute -bottom-6 left-0 rotate-[-3deg] rounded-full bg-white px-5 py-3 font-display text-[15px] font-bold text-ink shadow-soft sm:left-[-24px] sm:text-[16px]">
            <span className="text-stone">Van kwetsbaar</span> <span className="text-sun-text">naar kansrijk</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Why() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="waarom">
      <div ref={ref} className="wrap">
        <div className="max-w-2xl">
          <Eyebrow>Waarom FundamentPlus</Eyebrow>
          <h2 id="waarom" className="h-lg">{HOME.why.title}</h2>
          <p className="mt-5 text-[18px]">{HOME.why.text}</p>
        </div>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <li key={p.title} className="fade-up rounded-blob bg-paper p-8" style={{ transitionDelay: `${i * 120}ms` }}>
              <span aria-hidden="true" className="flex items-end gap-1.5">
                <span className="blend h-6 w-6 rounded-full" style={{ background: TONE[p.color].hex }} />
                <span className="blend h-10 w-3 rounded-t" style={{ background: TONE[p.color].hex, opacity: 0.6 }} />
              </span>
              <h3 className="mt-6 text-[24px]">{p.title}</h3>
              <p className="mt-3">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="aanbod" className="py-20 sm:py-28" aria-labelledby="aanbod-titel">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Ons aanbod</Eyebrow>
            <h2 id="aanbod-titel" className="h-lg">Begeleiding in elke fase</h2>
          </div>
          <p className="max-w-md">{HOME.personal.text}</p>
        </div>
        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {HOME.services.map((s) => (
            <li key={s.to}>
              <Link to={s.to} className="group flex h-full flex-col overflow-hidden rounded-blob bg-white shadow-soft transition hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Pic img={IMG[s.img]} sizes="(min-width:1024px) 380px, 92vw" className="h-full w-full transition duration-500 group-hover:scale-105" />
                  <span aria-hidden="true" className={`absolute bottom-0 left-8 h-2 w-16 rounded-t ${TONE[s.color].bg}`} />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="text-[26px]">{s.title}</h3>
                  <p className="mt-3 flex-1">{s.text}</p>
                  <span className={`mt-6 inline-flex items-center gap-2 font-display font-bold ${TONE[s.color].text}`}>
                    Lees meer <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Specials() {
  return (
    <section className="bg-ink py-20 text-white/85 sm:py-28" aria-labelledby="specialisaties">
      <div className="wrap">
        <div className="max-w-2xl">
          <Eyebrow light>Specialisaties</Eyebrow>
          <h2 id="specialisaties" className="h-lg !text-white">Vier manieren waarop we het verschil maken</h2>
          <p className="mt-5 text-[18px]">Net als de vier figuren in ons logo: elk anders, samen sterk.</p>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {HOME.specials.map((s) => (
            <li key={s.id}>
              <Link to={s.to} className="group relative flex h-full flex-col overflow-hidden rounded-blob bg-white/[0.06] p-8 ring-1 ring-white/10 transition hover:bg-white/[0.1]">
                <span aria-hidden="true" className="absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-90 transition group-hover:scale-110" style={{ background: TONE[s.color].hex }} />
                <p className="relative font-display text-[14px] font-bold uppercase tracking-[0.14em]" style={{ color: s.color === "plum" ? "#E59ADB" : TONE[s.color].hex }}>
                  {s.kicker}
                </p>
                <h3 className="relative mt-3 max-w-[80%] text-[26px] !text-white">{s.title}</h3>
                <p className="relative mt-3 flex-1">{s.text}</p>
                <span className="relative mt-6 inline-flex items-center gap-2 font-display font-bold text-white">
                  Lees meer <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Wonen() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="wonen-titel">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>Begeleid wonen</Eyebrow>
            <h2 id="wonen-titel" className="h-lg">Veilig wonen, stap voor stap naar zelfstandigheid</h2>
          </div>
          <p className="text-[18px]">
            Sommige jongeren hebben tijdelijk of langer een beschermde woonomgeving nodig. We bieden 24-uurs begeleid wonen in drie fases, en groepswonen als brug naar een eigen plek.
          </p>
        </div>
        <div className="mt-14">
          <PhasePath phases={PHASES} />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/begeleid-wonen/" className="btn-plum">Alles over woonbegeleiding <ArrowRight size={18} aria-hidden="true" /></Link>
          <Link to="/begeleid-wonen/#groepswonen" className="btn-ghost">Lees over groepswonen</Link>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="sfeer">
      <div className="wrap">
        <div className="max-w-2xl">
          <Eyebrow>Een kijkje binnen</Eyebrow>
          <h2 id="sfeer" className="h-lg">Een plek die voelt als thuis</h2>
          <p className="mt-5 text-[18px]">Een eigen kamer die je zelf inricht, samen koken en eten, en een huiskat die je komt begroeten.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
          <Pic img={IMG.thuis} sizes="(min-width:768px) 50vw, 100vw" className="col-span-2 aspect-[4/3] h-full w-full rounded-blob md:row-span-2 md:aspect-auto" />
          <Pic img={IMG.kat} sizes="(min-width:768px) 25vw, 50vw" className="aspect-square h-full w-full rounded-blob" />
          <Pic img={IMG.schilderwand} sizes="(min-width:768px) 25vw, 50vw" className="aspect-square h-full w-full rounded-blob md:row-span-2 md:aspect-auto" />
          <Pic img={IMG.woonkamer} sizes="(min-width:768px) 25vw, 100vw" className="col-span-2 aspect-[16/9] h-full w-full rounded-blob md:col-span-1 md:aspect-square" />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useSEO({
    title: "Jeugdhulp & Begeleid Wonen Amsterdam | FundamentPlus",
    description:
      "FundamentPlus biedt begeleid wonen, ambulante begeleiding en dagbesteding voor jongeren in Amsterdam en omgeving. Altijd bereikbaar. Plan een kennismaking.",
    path: "/",
    jsonld: [ORG, WEBSITE, faqLD(HOME.faq)],
  });
  return (
    <>
      <Hero />
      <Why />
      <Services />
      <Split img={IMG.gesprek} reverse tint="bg-plum-soft">
        <Eyebrow>Onze aanpak</Eyebrow>
        <h2 className="h-lg">{HOME.approach.title}</h2>
        <p className="mt-5 text-[18px]">{HOME.approach.text}</p>
        <a href="#contact" className="btn-primary mt-8">Plan een kennismaking <ArrowRight size={18} aria-hidden="true" /></a>
      </Split>
      <Specials />
      <Wonen />
      <Split img={IMG.garageTeam} frame="house" tint="bg-sun-soft">
        <Eyebrow>Dagbesteding</Eyebrow>
        <h2 className="h-lg">Een zinvolle dag, een stap richting zelfstandigheid</h2>
        <p className="mt-5 text-[18px]">{DAG.practice.text}</p>
        <Checklist items={DAG.practice.learn} tone="sun" className="mt-6" />
        <Link to="/dagbesteding/" className="btn-plum mt-8">Ontdek dagbesteding <ArrowRight size={18} aria-hidden="true" /></Link>
      </Split>
      <Gallery />
      <FAQ items={HOME.faq} />
      <ContactSection />
    </>
  );
}
