import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Clock, ChevronRight } from "lucide-react";
import type { Img } from "../content/site";
import { SITE } from "../content/site";
import { Eyebrow, HouseFrame, Figures, Pic, type Tone } from "./ui";
import ContactForm from "./ContactForm";
import { track } from "../lib/analytics";

export function Crumbs({ name }: { name: string }) {
  return (
    <nav aria-label="Kruimelpad" className="mb-6 text-[14px] text-mute">
      <ol className="flex flex-wrap items-center gap-1">
        <li><Link to="/" className="hover:text-ink">Home</Link></li>
        <li aria-hidden="true"><ChevronRight size={14} /></li>
        <li aria-current="page" className="font-semibold text-ink">{name}</li>
      </ol>
    </nav>
  );
}

const FAMILY: { tone: Tone; hex: string; tint: string; h: number }[] = [
  { tone: "plum", hex: "#9D258F", tint: "#E7C4E2", h: 0.62 },
  { tone: "berry", hex: "#ED008C", tint: "#F9C2E0", h: 0.46 },
  { tone: "sun", hex: "#FF8804", tint: "#FFD7A8", h: 0.8 },
  { tone: "sky", hex: "#00AAED", tint: "#B3E5FA", h: 0.66 },
];

const SOFT: Record<Tone, string> = { plum: "bg-plum-soft", berry: "bg-berry-soft", sun: "bg-sun-soft", sky: "bg-sky-soft" };

/**
 * Signature voor subpagina's: de vier figuren uit het logo.
 * De figuur van deze pagina staat groot vooraan met een foto; de andere drie staan er zacht naast.
 */
function FigureStage({ tone, img }: { tone: Tone; img?: Img }) {
  return (
    <div aria-hidden={img ? undefined : true} className="flex w-full items-end gap-2 [--s:.62] sm:gap-3 sm:[--s:.8] lg:[--s:.9] xl:[--s:1]">
      {FAMILY.map((f, i) => {
        const main = f.tone === tone;
        const body = main ? 400 : Math.round(f.h * 300);
        return (
          <div key={f.tone} className={`rise flex flex-col items-center gap-2 sm:gap-3 ${main ? "flex-[2.6]" : "flex-1"}`} style={{ animationDelay: `${(main ? 0 : 160) + i * 90}ms` }}>
            <span className="aspect-square rounded-full" style={{ width: main ? "46%" : "72%", background: main ? f.hex : f.tint }} />
            <div
              className={`relative w-full overflow-hidden ${main ? "rounded-t-[26px] sm:rounded-t-[34px]" : "rounded-t-[14px] sm:rounded-t-[18px]"}`}
              style={{ height: `calc(var(--s) * ${body}px)`, background: main ? f.hex : f.tint }}
            >
              {main && img && (
                <>
                  <Pic img={img} eager sizes="(min-width:1024px) 300px, 50vw" className="absolute inset-0 h-full w-full" />
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/4" style={{ background: `linear-gradient(0deg, ${f.hex}e6 0%, ${f.hex}00 100%)` }} />
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Hero voor subpagina's: tekst links, de figuren van FundamentPlus rechts op de 'vloer' van de sectie */
export function PageHero({
  crumb, eyebrow, title, lead, img, children, tone = "plum", facts,
}: { crumb: string; eyebrow: string; title: ReactNode; lead: string; img?: Img; children?: ReactNode; tone?: Tone; facts?: string[] }) {
  return (
    <section className={`relative overflow-hidden ${SOFT[tone]}`}>
      <span aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-white/50 blur-3xl" />
      <div className="wrap relative grid gap-10 pt-8 sm:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-14">
        <div className="lg:self-center lg:pb-20">
          <Crumbs name={crumb} />
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="h-xl max-w-[16ch]">{title}</h1>
          <p className="lead mt-6 max-w-[58ch]">{lead}</p>
          {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
          {facts && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {facts.map((f) => (
                <li key={f} className="rounded-full bg-white/80 px-4 py-2 text-[15px] font-semibold text-ink">{f}</li>
              ))}
            </ul>
          )}
        </div>
        <div className={`mx-auto w-full ${img ? "max-w-[440px] lg:max-w-[480px]" : "max-w-[300px] lg:max-w-[380px]"}`}>
          <FigureStage tone={tone} img={img} />
        </div>
      </div>
    </section>
  );
}

/** Afsluitende sectie op elke pagina: contactgegevens + formulier */
export function ContactSection({ title = "Vragen of aanmelden? We staan voor je klaar", id = "contact" }: { title?: string; id?: string }) {
  return (
    <section id={id} className="relative overflow-hidden bg-plum py-20 text-white sm:py-28" aria-labelledby={`${id}-title`}>
      <Figures className="pointer-events-none absolute -bottom-10 -right-16 hidden w-[340px] opacity-25 lg:block" heights={[0.7, 0.5, 1, 0.8]} />
      <div className="wrap relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Eyebrow light>Contact</Eyebrow>
          <h2 id={`${id}-title`} className="h-lg !text-white">{title}</h2>
          <p className="mt-5 max-w-md text-[18px] text-white/85">
            Plan een vrijblijvende kennismaking. We bespreken de situatie, de hulpvraag en wat we samen kunnen doen.
          </p>
          <ul className="mt-8 space-y-3 text-[17px]">
            <li>
              <a href={SITE.phoneHref} onClick={() => track("click_phone")} className="inline-flex min-h-[44px] items-center gap-3 font-display text-[22px] font-bold text-white hover:underline">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15"><Phone size={20} aria-hidden="true" /></span>
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} onClick={() => track("click_email")} className="inline-flex min-h-[44px] items-center gap-3 hover:underline">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15"><Mail size={20} aria-hidden="true" /></span>
                {SITE.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white/15"><Clock size={20} aria-hidden="true" /></span>
              Altijd iemand bereikbaar, ook 's nachts
            </li>
          </ul>
        </div>
        <div className="rounded-blob bg-white p-6 text-body shadow-soft sm:p-10">
          <ContactForm kind="contact" />
        </div>
      </div>
    </section>
  );
}

/** Tweekoloms sectie met foto */
export function Split({
  img, children, reverse = false, tint, id, frame = "round",
}: { img: Img; children: ReactNode; reverse?: boolean; tint?: string; id?: string; frame?: "round" | "house" }) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${tint ?? ""}`}>
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={reverse ? "lg:order-2" : ""}>
          {frame === "house" ? (
            <HouseFrame img={img} flip={!reverse} className="mx-auto w-full max-w-[480px]" />
          ) : (
            <div className="relative">
              <div aria-hidden="true" className={`absolute -inset-3 -z-0 rounded-[2.75rem] ${reverse ? "rotate-2 bg-sky-soft" : "-rotate-2 bg-sun-soft"}`} />
              <img
                src={`${img.src}-1400.webp`}
                srcSet={`${img.src}-800.webp 800w, ${img.src}-1400.webp 1400w`}
                sizes="(min-width:1024px) 560px, 92vw"
                width={img.w}
                height={img.h}
                alt={img.alt}
                loading="lazy"
                className="relative aspect-[4/3] w-full rounded-blob object-cover"
                style={img.pos ? { objectPosition: img.pos } : undefined}
              />
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
