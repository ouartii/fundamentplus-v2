import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { DAG, IMG } from "../content/site";
import { useSEO, ORG, faqLD, crumbsLD, serviceLD } from "../lib/seo";
import { Eyebrow, Checklist, FAQ, Pic, TONE, useReveal } from "../components/ui";
import { PageHero, ContactSection, Split } from "../components/PageTemplate";

function Goals() {
  const ref = useReveal<HTMLOListElement>();
  const tones = ["plum", "berry", "sun", "sky"] as const;
  return (
    <section className="bg-ink py-20 text-white/85 sm:py-28" aria-labelledby="doelen">
      <div className="wrap">
        <div className="max-w-2xl">
          <Eyebrow light>Doelen en doorstroom</Eyebrow>
          <h2 id="doelen" className="h-lg !text-white">{DAG.goals.title}</h2>
          <p className="mt-5 text-[18px]">Afhankelijk van de mogelijkheden bouwen we samen aan een toekomst met perspectief.</p>
        </div>
        <ol ref={ref} className="mt-14 grid gap-4 md:grid-cols-4">
          {DAG.goals.items.map((g, i) => (
            <li key={g} className="fade-up relative rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10" style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="font-display text-[44px] font-bold leading-none" style={{ color: TONE[tones[i]].hex }}>{i + 1}</span>
              <p className="mt-4 font-display text-[20px] font-bold text-white">{g}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function Dagbesteding() {
  useSEO({
    title: "Dagbesteding Jongeren Amsterdam | Werkervaring | FundamentPlus",
    description:
      "Dagbesteding voor jongeren in Amsterdam: structuur, echte werkervaring bij lokale partners en persoonlijke begeleiding richting school, stage of werk.",
    path: "/dagbesteding/",
    jsonld: [ORG, crumbsLD("Dagbesteding", "/dagbesteding/"), serviceLD("Dagbesteding voor jongeren", DAG.lead, "/dagbesteding/"), faqLD(DAG.faq)],
  });
  return (
    <>
      <PageHero crumb="Dagbesteding" eyebrow={DAG.eyebrow} title={DAG.title} lead={DAG.lead} img={IMG.garageTeam}>
        <a href="#contact" className="btn-primary">Plan een kennismaking <ArrowRight size={18} aria-hidden="true" /></a>
        <Link to="/aanmelden/" className="btn-ghost">Meld je kind aan</Link>
      </PageHero>

      <section className="bg-white py-20 sm:py-28" aria-labelledby="voorwie">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Voor wie</Eyebrow>
            <h2 id="voorwie" className="h-lg">{DAG.forWho.title}</h2>
            <p className="mt-5 text-[18px]">{DAG.forWho.after}</p>
          </div>
          <div className="rounded-blob bg-paper p-8 sm:p-10">
            <Checklist items={DAG.forWho.items} tone="sun" />
          </div>
        </div>
      </section>

      <Split img={IMG.gesprek} reverse>
        <Eyebrow>Onze aanpak</Eyebrow>
        <h2 className="h-lg">{DAG.approach.title}</h2>
        <p className="mt-5 text-[18px]">{DAG.approach.text}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {DAG.approach.items.map((t, i) => (
            <li key={t} className={`rounded-full px-4 py-2 font-display font-bold text-ink ${["bg-plum-soft", "bg-berry-soft", "bg-sun-soft", "bg-sky-soft"][i]}`}>{t}</li>
          ))}
        </ul>
      </Split>

      <section className="bg-sun-soft py-20 sm:py-28" aria-labelledby="praktijk">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <Eyebrow>Praktijkervaring</Eyebrow>
              <h2 id="praktijk" className="h-lg">{DAG.practice.title}</h2>
            </div>
            <p className="text-[18px]">{DAG.practice.text}</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <Pic img={IMG.polijsten} sizes="(min-width:768px) 33vw, 100vw" className="aspect-[4/5] w-full rounded-blob" />
            <Pic img={IMG.folie} sizes="(min-width:768px) 33vw, 100vw" className="aspect-[4/5] w-full rounded-blob" />
            <div className="card flex flex-col justify-center">
              <h3 className="text-[24px]">Wat jongeren leren</h3>
              <Checklist items={DAG.practice.learn} tone="sun" className="mt-5" />
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-[18px]">Zo groeien jongeren stap voor stap richting school, stage of werk.</p>
          <a href="#contact" className="btn-plum mt-6">Vraag meer informatie aan <ArrowRight size={18} aria-hidden="true" /></a>
        </div>
      </section>

      <Split img={IMG.polijstenDetail} frame="house">
        <Eyebrow>Vaardigheden</Eyebrow>
        <h2 className="h-lg">{DAG.skills.title}</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {DAG.skills.items.map((t) => (
            <li key={t} className="rounded-full bg-white px-4 py-2 font-display font-bold text-ink shadow-soft">{t}</li>
          ))}
        </ul>
        <p className="mt-6 text-[18px]">{DAG.skills.text}</p>
      </Split>

      <section className="bg-white py-20 sm:py-28" aria-labelledby="veilig">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Begeleiding</Eyebrow>
            <h2 id="veilig" className="h-lg">{DAG.safety.title}</h2>
            <p className="mt-5 text-[18px]">{DAG.safety.text}</p>
          </div>
          <div className="rounded-blob bg-sky-soft p-8 sm:p-10">
            <Checklist items={DAG.safety.items} tone="sky" />
          </div>
        </div>
      </section>

      <Goals />

      <section className="py-20 sm:py-24">
        <div className="wrap">
          <div className="relative overflow-hidden rounded-blob bg-white p-8 shadow-soft sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <h2 className="h-md">Samen kijken naar een passend traject?</h2>
              <p className="mt-4 text-[18px]">Zoek je dagbesteding voor je zoon of dochter? We denken graag mee over een traject dat echt aansluit bij wat je kind nodig heeft.</p>
            </div>
            <Link to="/aanmelden/" className="btn-primary mt-6 shrink-0 lg:mt-0">Meld je kind aan <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <FAQ items={DAG.faq} title="Vragen over dagbesteding" />
      <ContactSection />
    </>
  );
}
