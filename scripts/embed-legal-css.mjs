/**
 * Injecte public/legal.css dans chaque page légale (balise <style>).
 * À lancer avant `vite build` (voir script npm `build`).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const cssPath = path.join(root, "public", "legal.css");
const css = fs.readFileSync(cssPath, "utf8");
const pages = ["mentions-legales", "politique-de-confidentialite", "politique-cookies", "cgu"];
const styleBlock = `<style>\n${css}\n    </style>`;

for (const name of pages) {
  const htmlPath = path.join(root, "public", name, "index.html");
  let html = fs.readFileSync(htmlPath, "utf8");
  if (html.includes('<link rel="stylesheet" href="/legal.css" />')) {
    html = html.replace('    <link rel="stylesheet" href="/legal.css" />', styleBlock);
  } else {
    const re = /<style>[\s\S]*?<\/style>/;
    if (!re.test(html)) {
      throw new Error(`[embed-legal-css] Aucune balise <style> ni lien legal.css dans ${htmlPath}`);
    }
    html = html.replace(re, styleBlock);
  }
  fs.writeFileSync(htmlPath, html, "utf8");
  console.log("[embed-legal-css] OK", name);
}
