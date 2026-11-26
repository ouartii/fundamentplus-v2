// Schrijft elke route als echte HTML weg, plus 404.html, sitemap.xml en robots.txt
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const { render, ROUTES, SITE } = await import(pathToFileURL(path.join(root, "dist-ssr/entry-server.js")).href);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

function page(url) {
  const { html, head } = render(url);
  return template.replace("<!--head-->", head).replace("<!--app-->", html);
}

for (const r of ROUTES) {
  const out = path.join(dist, r.path, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(r.path));
  console.log("✓", r.path);
}
fs.writeFileSync(path.join(dist, "404.html"), page("/404/"));
console.log("✓ 404.html");

const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.filter((r) => !r.noindex)
  .map((r) => `  <url><loc>${SITE.url}${r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority ?? 0.5}</priority></url>`)
  .join("\n");
fs.writeFileSync(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /bedankt/\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
console.log("✓ sitemap.xml + robots.txt");
