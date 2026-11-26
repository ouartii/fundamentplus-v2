import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App, { type PageMap } from "./App";
import Home from "./pages/Home";
import BegeleidWonen from "./pages/BegeleidWonen";
import AmbulanteBegeleiding from "./pages/AmbulanteBegeleiding";
import Dagbesteding from "./pages/Dagbesteding";
import { Aanmelden, Contact, OverOns, WerkenBij, Klachten, Jeugdstem, Privacy, Bedankt, NotFound } from "./pages/Overig";
import { HeadProvider, renderHead, type Head } from "./lib/seo";
export { ROUTES } from "./routes";
export { SITE } from "./content/site";

const pages: PageMap = {
  "/": Home,
  "/begeleid-wonen/": BegeleidWonen,
  "/ambulante-begeleiding/": AmbulanteBegeleiding,
  "/dagbesteding/": Dagbesteding,
  "/aanmelden/": Aanmelden,
  "/contact/": Contact,
  "/over-ons/": OverOns,
  "/werken-bij/": WerkenBij,
  "/klachtenregelement/": Klachten,
  "/jeugdstem/": Jeugdstem,
  "/privacy/": Privacy,
  "/bedankt/": Bedankt,
  NotFound,
};

export function render(url: string) {
  const ctx: { head?: Head } = {};
  const html = renderToString(
    <HeadProvider value={ctx}>
      <StaticRouter location={url}>
        <App pages={pages} />
      </StaticRouter>
    </HeadProvider>,
  );
  return { html, head: ctx.head ? renderHead(ctx.head) : "" };
}
