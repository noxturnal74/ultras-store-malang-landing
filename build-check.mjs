import { existsSync, readFileSync } from "node:fs";

const required = [
  "index.html",
  "styles.css",
  "script.js",
  "brand.config.ts",
  "components/Logo.tsx",
  "components/Hero.tsx",
  "components/SectionRenderer.tsx",
  "app/layout.tsx",
  "assets/logo.svg",
  "assets/favicon.svg",
  "assets/hero.svg",
  "assets/gallery-1.svg",
  "assets/gallery-2.svg",
  "assets/gallery-3.svg"
];

const bannedTerms = [["Every","timewatch"],["Watch"," service"],["Konsultasi"," Jam"],["Laya","nan"],["Pa","ket"],["Kon","tak"],["Kota"," Malang"]].map((parts) => parts.join(""));
const html = readFileSync("index.html", "utf8");
let ok = true;

for (const file of required) {
  if (!existsSync(file)) {
    console.error("Missing required file:", file);
    ok = false;
  }
}

for (const term of bannedTerms) {
  if (html.includes(term)) {
    console.error("Banned copied term found:", term);
    ok = false;
  }
}

if (/https:\/\/images\.unsplash|ugc\.production|\.\.\//.test(html)) {
  console.error("Invalid asset path or external hotlink found.");
  ok = false;
}

if (!html.includes('./assets/logo.svg') || !html.includes('./assets/hero.svg')) {
  console.error("Relative asset paths are missing.");
  ok = false;
}

if (!readFileSync("script.js", "utf8").includes("requestAnimationFrame")) {
  console.error("JS parallax is missing.");
  ok = false;
}

if (!ok) process.exit(1);
console.log("Ultras Store static build check passed.");
