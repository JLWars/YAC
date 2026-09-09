// Dev screenshot helper — compares the redesigned hero to the mockup.
// Usage: node scripts/shot.mjs <path> <label> [widths] [mode]
//   node scripts/shot.mjs /limbattable step2 1280 hero      -> viewport crop of the hero area
//   node scripts/shot.mjs /affaires affaires 375,768,1280 full
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const [, , routeArg = "/limbattable", label = "shot", widthsArg = "1280", mode = "hero"] =
  process.argv;
const base = process.env.SHOT_BASE ?? "http://localhost:3000";
const widths = widthsArg.split(",").map((w) => parseInt(w.trim(), 10));
const outDir = "screenshots";

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();

for (const width of widths) {
  const height = mode === "hero" ? 1500 : 900;
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
  await page.goto(`${base}${routeArg}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(700); // let fonts + reveal settle
  const slug = routeArg.replace(/[^a-z0-9]+/gi, "") || "root";
  const file = `${outDir}/${label}-${slug}-${width}.png`;
  await page.screenshot({ path: file, fullPage: mode === "full" });
  console.log("saved", file);
  await page.close();
}

await browser.close();
