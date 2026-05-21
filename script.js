document.querySelectorAll("[data-fallback-logo]").forEach((img)=>{img.addEventListener("error",()=>{img.style.display="none"})});

const hero = document.querySelector(".hero");
let ticking = false;

function updateParallax() {
  if (!hero) return;
  hero.style.setProperty("--parallax-offset", window.scrollY * 0.28 + "px");
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

updateParallax();