import { existsSync, readFileSync } from "node:fs";

const required = ["index.html","styles.css","script.js","brand.config.ts","components/Logo.tsx","components/Hero.tsx","components/SectionRenderer.tsx","app/layout.tsx","assets/logo.svg","assets/favicon.svg","assets/hero.svg","assets/gallery-1.svg","assets/gallery-2.svg","assets/gallery-3.svg"];
const bannedTerms = [["Every","timewatch"],["Watch"," service"],["Konsultasi"," Jam"],["Laya","nan"],["Pa","ket"],["Kon","tak"],["Kota"," Malang"]].map((parts) => parts.join(""));
const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const js = readFileSync("script.js", "utf8");
const combined = html + "\n" + css + "\n" + js;
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

if (/https:\/\/images\.unsplash|source\.unsplash|ugc\.production|cdninstagram|lookaside|public\/assets|src="\/assets|href="\/assets|url\(["']?\/assets/.test(combined)) {
  console.error("Invalid asset path or external hotlink found.");
  ok = false;
}

if (combined.includes("background-attachment")) {
  console.error("Old fixed-background parallax found.");
  ok = false;
}

if (!html.includes('./assets/logo.svg') || !html.includes('./assets/hero.svg') || !html.includes('./script.js')) {
  console.error("Relative asset paths are missing.");
  ok = false;
}

if (!js.includes("requestAnimationFrame") || !js.includes('motionProfile = "ultras"') || !html.includes('data-motion-profile="ultras"')) {
  console.error("JS parallax/motion loop is missing.");
  ok = false;
}

for (const match of combined.matchAll(/\.\/assets\/[A-Za-z0-9_.-]+/g)) {
  const assetPath = match[0].replace("./", "");
  if (!existsSync(assetPath)) {
    console.error("Broken local asset reference:", match[0]);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log("Ultras Store brand-DNA build check passed.");
