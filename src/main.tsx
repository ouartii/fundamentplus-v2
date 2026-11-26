import { lazy, StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App, { type PageMap } from "./App";
import Home from "./pages/Home";
import { HeadProvider } from "./lib/seo";
import "./index.css";

const o = () => import("./pages/Overig");
const pages: PageMap = {
  "/": Home,
  "/begeleid-wonen/": lazy(() => import("./pages/BegeleidWonen")),
  "/ambulante-begeleiding/": lazy(() => import("./pages/AmbulanteBegeleiding")),
  "/dagbesteding/": lazy(() => import("./pages/Dagbesteding")),
  "/aanmelden/": lazy(() => o().then((m) => ({ default: m.Aanmelden }))),
  "/contact/": lazy(() => o().then((m) => ({ default: m.Contact }))),
  "/over-ons/": lazy(() => o().then((m) => ({ default: m.OverOns }))),
  "/werken-bij/": lazy(() => o().then((m) => ({ default: m.WerkenBij }))),
  "/klachtenregelement/": lazy(() => o().then((m) => ({ default: m.Klachten }))),
  "/jeugdstem/": lazy(() => o().then((m) => ({ default: m.Jeugdstem }))),
  "/privacy/": lazy(() => o().then((m) => ({ default: m.Privacy }))),
  "/bedankt/": lazy(() => o().then((m) => ({ default: m.Bedankt }))),
  NotFound: lazy(() => o().then((m) => ({ default: m.NotFound }))),
};

// Preview-build (claude.ai) gebruikt hash-routing zonder prerender
const PREVIEW = import.meta.env.VITE_PREVIEW === "1";
const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <HeadProvider value={{}}>
      {PREVIEW ? (
        <HashRouter>
          <App pages={pages} />
        </HashRouter>
      ) : (
        <BrowserRouter>
          <App pages={pages} />
        </BrowserRouter>
      )}
    </HeadProvider>
  </StrictMode>
);
if (!PREVIEW && root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
