import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";

// GA4 + Search Console uit tracking.config.json (Consent Mode v2, standaard geweigerd)
function tracking() {
  const cfg = JSON.parse(fs.readFileSync("tracking.config.json", "utf8"));
  return {
    name: "fp-tracking",
    transformIndexHtml(html: string) {
      const tags: string[] = [];
      if (cfg.searchConsole) tags.push(`<meta name="google-site-verification" content="${cfg.searchConsole}" />`);
      if (cfg.ga4) {
        tags.push(`<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});try{if(localStorage.getItem('fp-consent')==='granted')gtag('consent','update',{analytics_storage:'granted'})}catch(e){}gtag('js',new Date());gtag('config','${cfg.ga4}',{send_page_view:false});window.__GA4='${cfg.ga4}';</script>`);
        tags.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${cfg.ga4}"></script>`);
      }
      return html.replace("<!--tracking-->", tags.join("\n    "));
    },
  };
}

export default defineConfig({
  plugins: [react(), tracking()],
  build: { cssCodeSplit: false },
});
