/**
 * Génère les favicons à partir de src/assets/logo2.png (même visuel que le header).
 * Usage : node scripts/generate-favicon.mjs
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "src", "assets", "logo2.png");
const outDir = path.join(root, "public");

const bg = { r: 255, g: 255, b: 255, alpha: 0 };

async function main() {
  await sharp(src)
    .resize(32, 32, { fit: "contain", background: bg })
    .png()
    .toFile(path.join(outDir, "favicon-32x32.png"));
  await sharp(src)
    .resize(16, 16, { fit: "contain", background: bg })
    .png()
    .toFile(path.join(outDir, "favicon-16x16.png"));
  await sharp(src)
    .resize(180, 180, { fit: "contain", background: bg })
    .png()
    .toFile(path.join(outDir, "apple-touch-icon.png"));
  console.log("[generate-favicon] OK → public/favicon-*.png, apple-touch-icon.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
