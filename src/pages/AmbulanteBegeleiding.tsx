import { ArrowRight, Phone, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { AMB, IMG, SITE } from "../content/site";
import { useSEO, ORG, faqLD, crumbsLD, serviceLD } from "../lib/seo";
import { Eyebrow, Checklist, FAQ, Pic, Figures } from "../components/ui";
import { PageHero, ContactSection, Split } from "../components/PageTemplate";
import { track } from "../lib/analytics";

export default function AmbulanteBegeleiding() {
  useSEO({
    title: "Ambulante Begeleiding Jongeren Amsterdam | FundamentPlus",
    description:
      "Ambulante begeleiding voor jongeren thuis, op school of in de buurt. Ook forensisch, meidenspecifiek (Girls' Talk), met sport en VR. Vergoed via Jeugdwet of Wmo.",
    path: "/ambulante-begeleiding/",
    jsonld: [ORG, crumbsLD("Ambulante begeleiding", "/ambulante-begeleiding/"), serviceLD("Ambulante begeleiding voor jongeren", AMB.lead, "/ambulante-begeleiding/"), faqLD(AMB.faq)],
  });
  return (
    <>
      <PageHero crumb="Ambulante begeleiding" eyebrow={AMB.eyebrow} title={AMB.title} lead={AMB.lead} img={IMG.samenOpPad}>
        <a href="#contact" className="btn-primary">Plan een kennismaking <ArrowRight size={18} aria-hidden="true" /></a>
        <Link to="/aanmelden/" className="btn-ghost">Aanmelden</Link>
      </PageHero>

      <section className="bg-white py-20 sm:py-28" aria-labelledby="wat">
        <div className="wrap grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Eyebrow>Uitleg</Eyebrow>
            <h2 id="wat" className="h-lg">{AMB.what.title}</h2>
          </div>
          <div className="lg:col-span-2">
            <p className="text-[18px]">{AMB.what.text}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {AMB.what.items.map((t, i) => (
                <p key={t} className={`rounded-3xl p-6 font-display text-[18px] font-bold text-ink ${["bg-plum-soft", "bg-sun-soft", "bg-sky-soft"][i]}`}>{t}</p>
              ))}
            </div>
            <h3 className="mt-12 text-[26px]">{AMB.forWho.title}</h3>
            <p className="mt-3 text-[18px]">{AMB.forWho.text}</p>
          </div>
        </div>
      </section>

      <Split img={IMG.gesprek}>
        <Eyebrow>Visie en werkwijze</Eyebrow>
        <h2 className="h-lg">{AMB.vision.title}</h2>
        <p className="mt-5 text-[18px]">{AMB.vision.text}</p>
        <h3 className="mt-10 text-[24px]">{AMB.always.title}</h3>
        <p className="mt-3">{AMB.always.text}</p>
        <Checklist items={AMB.always.items} tone="plum" className="mt-5" />
      </Split>

      <section className="bg-sky-soft py-20 sm:py-24" aria-labelledby="netwerk">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Netwerk</Eyebrow>
            <h2 id="netwerk" className="h-lg">{AMB.network.title}</h2>
            <p className="mt-5 text-[18px]">Goede begeleiding staat nooit op zichzelf. {AMB.network.text}</p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {AMB.network.items.map((t) => (
              <li key={t} className="rounded-3xl bg-white p-5 font-display text-[18px] font-bold text-ink shadow-soft">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="forensisch" className="py-20 sm:py-28" aria-labelledby="forensisch-titel">
        <div className="wrap">
          <div className="relative overflow-hidden rounded-blob bg-ink p-8 text-white/85 sm:p-14">
            <Figures className="absolute -bottom-8 -right-6 w-56 opacity-30" heights={[0.6, 0.4, 0.9, 0.7]} />
            <div className="relative max-w-2xl">
              <Eyebrow light>Forensisch</Eyebrow>
              <h2 id="forensisch-titel" className="h-lg !text-white">{AMB.forensic.title}</h2>
              {AMB.forensic.text.map((p) => <p key={p} className="mt-5 text-[18px]">{p}</p>)}
              <a href="#contact" className="btn-primary mt-8">Neem contact op <ArrowRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>

      <Split id="sport" img={IMG.lezen} reverse tint="bg-sun-soft">
        <Eyebrow>Sport</Eyebrow>
        <h2 className="h-lg">{AMB.sport.title}</h2>
        <p className="mt-5 text-[18px]">{AMB.sport.text}</p>
        <Checklist items={AMB.sport.items} tone="sun" className="mt-6" />
      </Split>

      <section className="py-20 sm:py-28" aria-label="Ervaring van een ouder">
        <div className="wrap">
          <figure className="mx-auto max-w-3xl text-center">
            <Quote size={44} className="mx-auto text-berry" aria-hidden="true" />
            <blockquote className="mt-6 font-display text-[24px] font-semibold leading-[1.4] text-ink sm:text-[30px]">
              “{AMB.testimonial.text}”
            </blockquote>
            <figcaption className="mt-6 font-bold text-ink">
              {AMB.testimonial.who} <span className="font-normal text-mute">· {AMB.testimonial.role}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="meiden" className="bg-berry-soft py-20 sm:py-28" aria-labelledby="meiden-titel">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Pic img={IMG.girlsTalk} sizes="(min-width:1024px) 520px, 92vw" className="aspect-square w-full rounded-blob" />
          <div>
            <Eyebrow>Meidenspecifiek</Eyebrow>
            <h2 id="meiden-titel" className="h-lg">{AMB.girls.title}</h2>
            {AMB.girls.text.map((p) => <p key={p} className="mt-5 text-[18px]">{p}</p>)}
            <div className="mt-8 rounded-3xl bg-white p-6 shadow-soft">
              <p className="font-bold text-ink">{AMB.girls.alert}</p>
              <a href={SITE.phoneHref} onClick={() => track("click_phone")} className="btn-plum mt-4">
                <Phone size={18} aria-hidden="true" /> Direct contact: {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="vr" className="py-20 sm:py-28" aria-labelledby="vr-titel">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:order-2">
            <Pic img={IMG.vr} sizes="(min-width:1024px) 520px, 92vw" className="aspect-square w-full rounded-blob" />
          </div>
          <div>
            <Eyebrow>Virtual Reality</Eyebrow>
            <h2 id="vr-titel" className="h-lg">{AMB.vr.title}</h2>
            {AMB.vr.text.map((p) => <p key={p} className="mt-5 text-[18px]">{p}</p>)}
            <Link to="/aanmelden/" className="btn-primary mt-8">Ontvang persoonlijk advies <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <FAQ items={AMB.faq} title="Vragen over ambulante begeleiding" />
      <ContactSection />
    </>
  );
}
