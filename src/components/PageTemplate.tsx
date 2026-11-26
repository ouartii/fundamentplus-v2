import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Clock, ChevronRight } from "lucide-react";
import type { Img } from "../content/site";
import { SITE } from "../content/site";
import { Eyebrow, HouseFrame, Figures } from "./ui";
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

/** Hero voor subpagina's: tekst links, foto in de huisvorm rechts */
export function PageHero({
  crumb, eyebrow, title, lead, img, children,
}: { crumb: string; eyebrow: string; title: ReactNode; lead: string; img?: Img; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-8 sm:pb-24 sm:pt-12">
      <div className={`wrap grid items-center gap-12 ${img ? "lg:grid-cols-[1.1fr_0.9fr] lg:gap-16" : ""}`}>
        <div>
          <Crumbs name={crumb} />
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="h-xl max-w-[16ch]">{title}</h1>
          <p className="lead mt-6 max-w-[58ch]">{lead}</p>
          {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
        </div>
        {img ? (
          <HouseFrame img={img} eager className="mx-auto w-full max-w-[460px]" sizes="(min-width:1024px) 460px, 90vw" />
        ) : null}
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
