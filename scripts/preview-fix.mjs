// Maakt dist-preview geschikt voor een claude.ai-preview: relatieve paden, titel.
import fs from "node:fs";
import path from "node:path";
const dir = "dist-preview";
for (const f of fs.readdirSync(path.join(dir, "assets"))) {
  const p = path.join(dir, "assets", f);
  let s = fs.readFileSync(p, "utf8");
  s = s.replaceAll('"/images/', '"images/').replaceAll("`/images/", "`images/").replaceAll("url(/fonts/", "url(../fonts/");
  fs.writeFileSync(p, s);
}
let html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
html = html
  .replace("<!--head-->", "<title>FundamentPlus – nieuwe website (preview)</title>")
  .replaceAll('href="/', 'href="./')
  .replace(/<!--tracking-->|<!--app-->/g, "");
fs.writeFileSync(path.join(dir, "index.html"), html);
for (const f of ["api", ".htaccess", "og-image.jpg"]) fs.rmSync(path.join(dir, f), { recursive: true, force: true });
console.log("preview klaar");
