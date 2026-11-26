import { useEffect, useRef, type ReactNode } from "react";
import { Plus, Check } from "lucide-react";
import type { Img, QA } from "../content/site";

export type Tone = "plum" | "berry" | "sun" | "sky";

export const TONE: Record<Tone, { hex: string; soft: string; text: string; bg: string }> = {
  plum: { hex: "#9D258F", soft: "bg-plum-soft", text: "text-plum", bg: "bg-plum" },
  berry: { hex: "#ED008C", soft: "bg-berry-soft", text: "text-[#B5006B]", bg: "bg-berry" },
  sun: { hex: "#FF8804", soft: "bg-sun-soft", text: "text-sun-text", bg: "bg-sun" },
  sky: { hex: "#00AAED", soft: "bg-sky-soft", text: "text-sky-deep", bg: "bg-sky" },
};

/** Responsieve foto in 800/1400 px WebP */
export function Pic({ img, className = "", sizes = "(min-width:1024px) 50vw, 100vw", eager = false }: { img: Img; className?: string; sizes?: string; eager?: boolean }) {
  return (
    <img
      src={`${img.src}-1400.webp`}
      srcSet={`${img.src}-800.webp 800w, ${img.src}-1400.webp 1400w`}
      sizes={sizes}
      width={img.w}
      height={img.h}
      alt={img.alt}
      loading={eager ? "eager" : "lazy"}
      decoding={eager ? "sync" : "async"}
      {...(eager ? { fetchpriority: "high" } : {})}
      className={`object-cover ${className}`}
      style={img.pos ? { objectPosition: img.pos } : undefined}
    />
  );
}

/** Vier kleurstippen, de familie uit het logo */
export function Dots({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span aria-hidden="true" className={`inline-flex items-center -space-x-1 ${className}`}>
      {["#9D258F", "#ED008C", "#FF8804", "#00AAED"].map((c) => (
        <span key={c} className={`${light ? "" : "blend "}h-3 w-3 rounded-full`} style={{ background: c, opacity: 0.9, boxShadow: light ? "0 0 0 1.5px rgba(255,255,255,.25)" : undefined }} />
      ))}
    </span>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`mb-4 flex items-center gap-3 font-display text-[14px] font-bold uppercase tracking-[0.14em] ${light ? "text-white/85" : "text-stone"}`}>
      <Dots light={light} />
      {children}
    </p>
  );
}

/**
 * Signature: de vier figuren uit het logo (hoofd + lijf), overlappend met multiply.
 * heights bepaalt de lengte van elke figuur (0-1).
 */
export function Figures({ className = "", heights = [0.78, 0.55, 1, 0.82] }: { className?: string; heights?: number[] }) {
  const cols = [
    { x: 0, c: "#9D258F" },
    { x: 58, c: "#ED008C" },
    { x: 100, c: "#FF8804" },
    { x: 158, c: "#00AAED" },
  ];
  const H = 300;
  return (
    <svg viewBox="0 0 220 300" className={className} aria-hidden="true" focusable="false">
      {cols.map((col, i) => {
        const h = Math.round(heights[i] * 200);
        const top = H - h;
        return (
          <g key={i} className="blend" opacity="0.88">
            <circle cx={col.x + 31} cy={top - 38} r="31" fill={col.c} />
            <rect x={col.x} y={top} width="62" height={h} rx="6" fill={col.c} />
          </g>
        );
      })}
    </svg>
  );
}

/** Definitie van de huisvorm uit het logo, eenmaal in de pagina */
export function HouseDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="fp-house" clipPathUnits="objectBoundingBox">
          <path d="M.46 .018 Q.5 -.009 .54 .018 L.97 .3 Q1 .32 1 .355 L1 .936 Q1 1 .93 1 L.07 1 Q0 1 0 .936 L0 .355 Q0 .32 .03 .3 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** Foto in de huisvorm met de figuren erachter: het signature-element van de site */
export function HouseFrame({ img, eager = false, flip = false, className = "", sizes }: { img: Img; eager?: boolean; flip?: boolean; className?: string; sizes?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Figures className={`absolute -top-[6%] w-[46%] ${flip ? "-left-[8%]" : "-right-[8%]"} h-auto`} />
      <div className="relative aspect-[10/11] w-full">
        <Pic img={img} eager={eager} sizes={sizes} className="house-clip absolute inset-0 h-full w-full" />
      </div>
    </div>
  );
}

/** Maakt elementen zichtbaar zodra ze in beeld komen */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("is-in"); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { el.classList.add("is-in"); io.disconnect(); } }),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Fasepad: van kwetsbaar naar kansrijk, figuren groeien per fase */
export function PhasePath({ phases }: { phases: { n: number; title: string; text: string }[] }) {
  const ref = useReveal<HTMLOListElement>();
  const tones: Tone[] = ["plum", "sun", "sky"];
  const hs = [0.38, 0.66, 1];
  return (
    <ol ref={ref} className="grid gap-5 md:grid-cols-3 md:gap-6">
      {phases.map((p, i) => (
        <li key={p.n} className="relative flex flex-col overflow-hidden rounded-blob bg-white p-7 shadow-soft">
          <div className="flex h-[150px] items-end gap-2" aria-hidden="true">
            {[0, 1, 2].map((k) => (
              <span key={k} className="grow flex flex-col items-center" style={{ transitionDelay: `${i * 180 + k * 60}ms` }}>
                <span className="blend mb-1 h-7 w-7 rounded-full" style={{ background: TONE[tones[i]].hex }} />
                <span className="blend w-7 rounded-t-md" style={{ height: `${Math.round(hs[i] * (90 - k * 12))}px`, background: TONE[tones[i]].hex, opacity: 1 - k * 0.25 }} />
              </span>
            ))}
          </div>
          <p className={`mt-6 font-display text-[15px] font-bold uppercase tracking-[0.12em] ${TONE[tones[i]].text}`}>Fase {p.n}</p>
          <h3 className="mt-1 text-[24px]">{p.title}</h3>
          <p className="mt-2">{p.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Checklist({ items, tone = "plum", className = "" }: { items: readonly string[]; tone?: Tone; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span className={`mt-[3px] grid h-6 w-6 shrink-0 place-items-center rounded-full ${TONE[tone].bg} ${tone === "sun" || tone === "sky" ? "text-ink" : "text-white"}`}>
            <Check size={15} strokeWidth={3} aria-hidden="true" />
          </span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function FAQ({ items, title = "Veelgestelde vragen", intro }: { items: QA[]; title?: string; intro?: string }) {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="faq-title">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <h2 id="faq-title" className="h-lg">{title}</h2>
          <p className="mt-4 max-w-md">
            {intro ?? "Goede zorg begint met duidelijkheid. Staat je vraag er niet bij? Neem gerust contact op, we denken graag met je mee."}
          </p>
        </div>
        <div className="divide-y divide-line rounded-blob bg-white px-6 shadow-soft sm:px-8">
          {items.map((it) => (
            <details key={it.q} className="group py-2">
              <summary className="flex min-h-[56px] cursor-pointer items-center justify-between gap-4 py-3 font-display text-[18px] font-bold text-ink">
                {it.q}
                <span className="faq-icon grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sun-soft text-sun-text transition-transform">
                  <Plus size={18} aria-hidden="true" />
                </span>
              </summary>
              <div className="space-y-3 pb-5 pr-10">
                {it.a.map((p) => <p key={p}>{p}</p>)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
