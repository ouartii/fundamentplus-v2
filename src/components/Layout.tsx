import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin, ArrowRight, Send } from "lucide-react";
import { NAV, SERVICES_NAV, FOOTER_LINKS, CERTS, SITE } from "../content/site";
import { HouseDefs } from "./ui";
import { pageView, setConsent, track } from "../lib/analytics";

function Logo({ white = false }: { white?: boolean }) {
  return (
    <img
      src={white ? "/images/logo-wit.webp" : "/images/logo.webp"}
      alt="FundamentPlus – Van kwetsbaar naar kansrijk"
      width={1166}
      height={white ? 296 : 322}
      className="h-11 w-auto sm:h-12"
    />
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <header className={`sticky top-0 z-40 transition-colors ${scrolled || open ? "bg-paper/95 shadow-[0_1px_0_#E9E1DA] backdrop-blur" : "bg-paper"}`}>
      <a href="#inhoud" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Naar de inhoud
      </a>
      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <Link to="/" aria-label="FundamentPlus, naar de homepage" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Hoofdmenu" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-full px-3 py-2 font-display text-[15.5px] font-bold transition-colors ${isActive ? "bg-plum-soft text-plum" : "text-ink hover:bg-white"}`
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a href={SITE.phoneHref} onClick={() => track("click_phone")} className="hidden items-center gap-2 whitespace-nowrap px-2 font-display font-bold text-ink 2xl:flex">
            <Phone size={17} aria-hidden="true" className="text-plum" /> {SITE.phone}
          </a>
          <Link to="/aanmelden/" className="btn-primary hidden !min-h-[44px] !px-5 sm:inline-flex">
            Aanmelden
          </Link>
          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full text-ink hover:bg-white xl:hidden"
            aria-expanded={open}
            aria-controls="mobiel-menu"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobiel-menu" aria-label="Mobiel menu" hidden={!open} className="border-t border-line bg-paper xl:hidden">
        <ul className="wrap py-4">
          {[{ to: "/", label: "Home" }, ...NAV, { to: "/over-ons/", label: "Over ons" }, { to: "/werken-bij/", label: "Werken bij" }, { to: "/contact/", label: "Contact" }].map((n) => (
            <li key={n.to}>
              <NavLink
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) => `flex min-h-[52px] items-center justify-between border-b border-line font-display text-[20px] font-bold ${isActive ? "text-plum" : "text-ink"}`}
              >
                {n.label} <ArrowRight size={18} aria-hidden="true" />
              </NavLink>
            </li>
          ))}
          <li className="pt-5">
            <Link to="/aanmelden/" className="btn-primary w-full">Aanmelden</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink pb-28 pt-20 text-white/80 lg:pb-12">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-plum/40 blur-3xl" />
      <div className="wrap relative grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.9fr]">
        <div>
          <Logo white />
          <p className="mt-6 max-w-sm text-[17px]">{SITE.intro}</p>
          <ul className="mt-6 space-y-3">
            <li>
              <a href={SITE.phoneHref} onClick={() => track("click_phone")} className="inline-flex items-center gap-3 hover:text-white">
                <Phone size={18} className="text-sun" aria-hidden="true" /> {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} onClick={() => track("click_email")} className="inline-flex items-center gap-3 hover:text-white">
                <Mail size={18} className="text-sky" aria-hidden="true" /> {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener" className="inline-flex items-start gap-3 hover:text-white">
                <MapPin size={18} className="mt-1 text-berry" aria-hidden="true" />
                <span>{SITE.street}<br />{SITE.postal} {SITE.city}</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-[15px] font-bold uppercase tracking-[0.12em] text-white">Begeleiding</h2>
            <ul className="mt-4 space-y-2.5">
              {SERVICES_NAV.map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-white">{n.label}</Link></li>
              ))}
              <li><Link to="/aanmelden/" className="hover:text-white">Aanmelden</Link></li>
              <li><Link to="/contact/" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[15px] font-bold uppercase tracking-[0.12em] text-white">Algemeen</h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-white">{n.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className="font-display text-[15px] font-bold uppercase tracking-[0.12em] text-white">Erkend en aangesloten</h2>
          <ul className="mt-4 grid grid-cols-3 gap-3 lg:grid-cols-2">
            {CERTS.map((c) => (
              <li key={c.alt} className={`grid h-[84px] place-items-center rounded-2xl bg-white p-3 ${c.w / c.h > 4 ? "col-span-3 lg:col-span-2" : ""}`}>
                <img src={c.src} alt={c.alt} width={c.w} height={c.h} loading="lazy" className="h-auto max-h-[60px] w-auto max-w-full object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap relative mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-[14px] text-white/60 sm:flex-row sm:justify-between">
        <p>© {year} FundamentPlus · Alle rechten voorbehouden</p>
        <p className="font-display font-bold text-sun">Van kwetsbaar naar kansrijk</p>
      </div>
    </footer>
  );
}

function MobileStickyBar() {
  return (
    <nav aria-label="Snel contact" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur lg:hidden">
      <ul className="grid grid-cols-[1fr_1fr_1.4fr] gap-2">
        <li>
          <a href={SITE.phoneHref} onClick={() => track("click_phone")} className="flex min-h-[48px] flex-col items-center justify-center rounded-2xl bg-white text-[13px] font-bold text-ink shadow-soft">
            <Phone size={18} className="text-plum" aria-hidden="true" /> Bellen
          </a>
        </li>
        <li>
          <a href={`mailto:${SITE.email}`} onClick={() => track("click_email")} className="flex min-h-[48px] flex-col items-center justify-center rounded-2xl bg-white text-[13px] font-bold text-ink shadow-soft">
            <Mail size={18} className="text-sky-deep" aria-hidden="true" /> Mailen
          </a>
        </li>
        <li>
          <Link to="/aanmelden/" className="btn-primary h-full w-full !min-h-[48px] !px-3 !text-[15px]">
            <Send size={17} aria-hidden="true" /> Aanmelden
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!window.__GA4) return; // geen GA4 ingesteld = geen cookies, geen melding
    try { if (!localStorage.getItem("fp-consent")) setShow(true); } catch { /* */ }
  }, []);
  if (!show) return null;
  const choose = (g: boolean) => { setConsent(g); setShow(false); };
  return (
    <div role="dialog" aria-live="polite" aria-label="Cookies" className="fixed inset-x-3 bottom-[88px] z-50 mx-auto max-w-xl rounded-3xl bg-white p-5 shadow-soft ring-1 ring-line lg:bottom-6">
      <p className="text-[15px]">
        We gebruiken alleen analytische cookies om de website te verbeteren, en pas als je daar akkoord op geeft.{" "}
        <Link to="/privacy/" className="link">Privacybeleid</Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" className="btn-plum !min-h-[44px] !px-5" onClick={() => choose(true)}>Akkoord</button>
        <button type="button" className="btn-ghost !min-h-[44px] !px-5" onClick={() => choose(false)}>Weigeren</button>
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
    pageView(pathname);
  }, [pathname, hash]);
  return (
    <>
      <HouseDefs />
      <Header />
      <main id="inhoud">{children}</main>
      <Footer />
      <MobileStickyBar />
      <CookieBanner />
    </>
  );
}
