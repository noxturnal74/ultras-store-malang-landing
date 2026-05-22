const motionProfile = "ultras";
document.body.dataset.motionReady = motionProfile;

document.querySelectorAll("[data-fallback-logo]").forEach((img)=>{img.addEventListener("error",()=>{img.style.display="none"})});

let ticking = false;
let pointerX = 0.5;
let pointerY = 0.35;
function updateScroll() {
  const scrollY = window.scrollY;
  const root = document.documentElement;
  root.style.setProperty("--scroll-shift", String(scrollY));
  root.style.setProperty("--pointer-x", String(pointerX));
  root.style.setProperty("--pointer-y", String(pointerY));
  document.body.classList.toggle("is-scrolled", scrollY > 18);
  if (motionProfile === "watch") root.style.setProperty("--dial-rotation", `${scrollY * 0.025}deg`);
  if (motionProfile === "ultras") root.style.setProperty("--editorial-pan", `${Math.sin(scrollY / 280) * 18}px`);
  if (motionProfile === "studio") root.style.setProperty("--beat", String(0.2 + Math.abs(Math.sin(scrollY / 90)) * 0.42));
  if (motionProfile === "kopitiam") root.style.setProperty("--steam", String(Math.min(36, scrollY * 0.04)));
  if (motionProfile === "calcio") root.style.setProperty("--score-pan", `${Math.sin(scrollY / 180) * 20}px`);
  if (motionProfile === "sweet") root.style.setProperty("--rack-pan", `${(pointerX - 0.5) * 28}px`);
}
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScroll();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
updateScroll();

window.addEventListener("pointermove", (event) => {
  pointerX = event.clientX / Math.max(1, window.innerWidth);
  pointerY = event.clientY / Math.max(1, window.innerHeight);
  if (!ticking) {
    requestAnimationFrame(() => {
      updateScroll();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

document.querySelectorAll("[data-toggle-group]").forEach((group) => {
  group.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLButtonElement)) return;
    group.querySelectorAll("button").forEach((button) => button.classList.remove("is-active"));
    event.target.classList.add("is-active");
    if (motionProfile === "geprek") document.body.dataset.heat = event.target.textContent.trim().toLowerCase();
  });
});

document.querySelectorAll(".diagnostic-card button").forEach((button, index) => {
  if (index === 0) button.classList.add("is-active");
  button.addEventListener("click", () => {
    document.querySelectorAll(".diagnostic-card button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
  });
});

document.querySelectorAll(".channel-stack a").forEach((link) => {
  link.addEventListener("mouseenter", () => link.closest(".channel-stack")?.classList.add("is-focused"));
  link.addEventListener("mouseleave", () => link.closest(".channel-stack")?.classList.remove("is-focused"));
});

const status = document.querySelector(".console-status");
if (status) {
  const states = ["slots syncing", "party ready", "admin online"];
  let stateIndex = 0;
  setInterval(() => {
    stateIndex = (stateIndex + 1) % states.length;
    status.dataset.status = states[stateIndex];
  }, 1800);
}

const issue = document.querySelector(".issue");
if (issue) issue.dataset.issue = "01";

const scoreboard = document.querySelector(".scoreboard");
if (scoreboard) {
  let minute = 1;
  setInterval(() => {
    minute = minute === 90 ? 1 : minute + 1;
    scoreboard.dataset.minute = String(minute).padStart(2, "0");
  }, 1200);
}