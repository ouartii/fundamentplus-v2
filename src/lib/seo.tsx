import { createContext, useContext, useEffect, type ReactNode } from "react";
import { SITE } from "../content/site";

export type Head = { title: string; description: string; path: string; noindex?: boolean; jsonld?: object[] };
type Ctx = { head?: Head };
const HeadCtx = createContext<Ctx>({});

export function HeadProvider({ value, children }: { value: Ctx; children: ReactNode }) {
  return <HeadCtx.Provider value={value}>{children}</HeadCtx.Provider>;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

export function renderHead(h: Head): string {
  const url = SITE.url + h.path;
  const img = SITE.url + "/og-image.jpg";
  const tags = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    h.noindex ? `<meta name="robots" content="noindex, follow" />` : "",
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="nl_NL" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    ...(h.jsonld || []).map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`),
  ];
  return tags.filter(Boolean).join("\n    ");
}

export function useSEO(h: Head) {
  const ctx = useContext(HeadCtx);
  if (typeof window === "undefined") ctx.head = h; // server: verzamelen
  useEffect(() => {
    document.title = h.title;
    const set = (sel: string, attr: string, val: string) => document.querySelector(sel)?.setAttribute(attr, val);
    set('meta[name="description"]', "content", h.description);
    set('link[rel="canonical"]', "href", SITE.url + h.path);
    set('meta[property="og:title"]', "content", h.title);
    set('meta[property="og:description"]', "content", h.description);
    set('meta[property="og:url"]', "content", SITE.url + h.path);
  }, [h.title, h.description, h.path]);
}

// Structured data
export const ORG = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": SITE.url + "/#organisatie",
  name: SITE.name,
  slogan: SITE.tagline,
  url: SITE.url,
  logo: SITE.url + "/images/logo.png",
  image: SITE.url + "/og-image.jpg",
  telephone: "+31207370905",
  email: SITE.email,
  address: { "@type": "PostalAddress", streetAddress: SITE.street, postalCode: SITE.postal, addressLocality: SITE.city, addressCountry: "NL" },
  areaServed: SITE.regions.map((r) => ({ "@type": "AdministrativeArea", name: r })),
};

export const WEBSITE = { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url, inLanguage: "nl-NL" };

export function faqLD(items: { q: string; a: string[] }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a.join(" ") } })),
  };
}

export function crumbsLD(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url + "/" },
      { "@type": "ListItem", position: 2, name, item: SITE.url + path },
    ],
  };
}

export function serviceLD(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: SITE.url + path,
    provider: { "@id": SITE.url + "/#organisatie" },
    areaServed: SITE.regions,
  };
}
