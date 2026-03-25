import sharp from "sharp";
import { writeFileSync, copyFileSync, unlinkSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const logoPath = join(__dirname, "../src/assets/logo.png");
const tmpPath = join(__dirname, "../src/assets/.logo-bake-tmp.png");

/** Fond page mode sombre (--bg) #1A1A18 */
const BG_R = 26;
const BG_G = 26;
const BG_B = 24;

const { data, info } = await sharp(logoPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const px = new Uint8Array(data);
const step = channels;

for (let i = 0; i < px.length; i += step) {
  const r = px[i];
  const g = px[i + 1];
  const b = px[i + 2];
  const a = step === 4 ? px[i + 3] : 255;

  if (a < 128) {
    px[i] = BG_R;
    px[i + 1] = BG_G;
    px[i + 2] = BG_B;
    if (step === 4) px[i + 3] = 255;
    continue;
  }

  if (r <= 12 && g <= 12 && b <= 12) {
    px[i] = BG_R;
    px[i + 1] = BG_G;
    px[i + 2] = BG_B;
  }
}

const out = await sharp(Buffer.from(px), {
  raw: { width, height, channels: step },
})
  .png({ compressionLevel: 9 })
  .toBuffer();

writeFileSync(tmpPath, out);
copyFileSync(tmpPath, logoPath);
unlinkSync(tmpPath);

console.log("logo.png : fond #1a1a18 (transparence + pixels très sombres).");
