// Alle routes. Bron voor router, prerender en sitemap.
export type RouteDef = { path: string; noindex?: boolean; priority?: number };

export const ROUTES: RouteDef[] = [
  { path: "/", priority: 1 },
  { path: "/begeleid-wonen/", priority: 0.9 },
  { path: "/ambulante-begeleiding/", priority: 0.9 },
  { path: "/dagbesteding/", priority: 0.9 },
  { path: "/aanmelden/", priority: 0.8 },
  { path: "/contact/", priority: 0.7 },
  { path: "/over-ons/", priority: 0.6 },
  { path: "/werken-bij/", priority: 0.6 },
  { path: "/klachtenregelement/", priority: 0.4 },
  { path: "/jeugdstem/", priority: 0.4 },
  { path: "/privacy/", priority: 0.2 },
  { path: "/bedankt/", noindex: true },
];
