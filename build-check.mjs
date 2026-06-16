import { existsSync, readFileSync } from "node:fs";

const required = ["index.html", "styles.css", "script.js", "package.json", "vercel.json", "PRODUCTION_AUDIT.md", "BATCH_NOTES.md", "README.md", "assets/logo.svg", "assets/favicon.svg", "assets/photos/README.md"];
const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const js = readFileSync("script.js", "utf8");
const combined = html + "\n" + css + "\n" + js;
let ok = true;
const fail = (message) => { console.error(message); ok = false; };

for (const file of required) if (!existsSync(file)) fail("Missing required file: " + file);
if (!html.includes('href="./styles.css"')) fail("index.html must reference styles.css.");
if (!html.includes('src="./script.js"')) fail("index.html must reference script.js.");
const imageRefs = [...html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/g)];
if (imageRefs.length < 7) fail("At least 7 images are required, found " + imageRefs.length + ".");
if (/<img\b[^>]*\bsrc=["']\s*["']/i.test(html)) fail("Empty image src found.");
if (/source\.unsplash\.com\/random|source\.unsplash\.com/i.test(combined)) fail("Random Unsplash image API found.");
if (/[A-Z]:\\|C:\/Users\//i.test(combined)) fail("Local Windows path found.");
for (const match of imageRefs) {
  const src = match[1];
  if (src.startsWith("./") && !existsSync(src.replace("./", ""))) fail("Broken local image path: " + src);
  if (!/\balt=["'][^"']+["']/i.test(match[0])) fail("Image missing meaningful alt text: " + src);
}
if (/href=["']\s*["']/i.test(html)) fail("Empty href found.");
if (/href=["']#["']/i.test(html)) fail("Meaningless href=# found.");
const interactiveCount = (html.match(/<(button|input|textarea|summary)\b/gi) || []).length + (html.match(/data-whatsapp-link/g) || []).length;
if (interactiveCount < 7) fail("At least 7 interactive elements required, found " + interactiveCount + ".");
if (!html.includes('class="modal"') && !html.includes(" modal ")) fail("At least one modal is required.");
if (!/data-filter|data-tab|data-package|data-select-card/.test(html)) fail("At least one filter/tab/selector is required.");
if (!/data-whatsapp|wa\.me/.test(combined)) fail("WhatsApp CTA/generator is required.");
if (!html.includes('id="business-info"')) fail("Business info section missing.");
if (!html.includes('id="proof"')) fail("Proof/review section missing.");
if (!/<title>[^<]+<\/title>/i.test(html)) fail("Title metadata missing.");
if (!/<meta name="description" content="[^"]+"/i.test(html)) fail("Meta description missing.");
if (!/<link rel="canonical" href="https:\/\//i.test(html)) fail("Canonical URL missing.");
if (!/<script type="application\/ld\+json">/i.test(html)) fail("JSON-LD structured data missing.");
const h1Count = (html.match(/<h1\b/gi) || []).length;
if (h1Count !== 1) fail("Exactly one h1 required, found " + h1Count + ".");
if (!js.includes("js-ready")) fail("script.js must add js-ready.");
if (!js.includes("IntersectionObserver")) fail("IntersectionObserver or fallback required.");
if (!css.includes("prefers-reduced-motion")) fail("Reduced motion CSS missing.");
if (!css.includes(":focus-visible")) fail("Focus-visible CSS missing.");
if (!/data-business-status/.test(html) || !js.includes("updateStatus")) fail("Dynamic business status missing.");
if (!/data-lightbox-src/.test(html) || !js.includes("lightbox")) fail("Gallery lightbox missing.");
if (!/data-open-modal/.test(html) || !js.includes("Escape")) fail("Accessible modal and Escape close missing.");

if (!ok) process.exit(1);
console.log("Ultras Store production validation passed.");
