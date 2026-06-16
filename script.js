(() => {
  const SITE = {"brand":"Ultras Store","shortName":"Ultras","publicLink":"https://linktr.ee/ultrasmlg","defaultIntent":"Saya mau tanya drop Ultras Store","phone":""};
  const BUSINESS_WHATSAPP = SITE.phone;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  document.body.classList.add("js-ready");

  const navToggle = $("[data-nav-toggle]");
  const navPanel = $("[data-nav-panel]");
  if (navToggle && navPanel) {
    navToggle.addEventListener("click", () => {
      const open = navPanel.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const sections = $$("main section[id]");
  const navLinks = $$("[data-nav-link]");
  const activateNav = () => {
    let active = "";
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top < 140) active = section.id;
    });
    navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === "#" + active));
    document.body.classList.toggle("is-scrolled", window.scrollY > 20);
    const sticky = $("[data-sticky-cta]");
    if (sticky) sticky.classList.toggle("is-visible", window.scrollY > 560);
  };
  window.addEventListener("scroll", activateNav, { passive: true });
  activateNav();

  $$("[data-fallback-image]").forEach((img) => {
    img.addEventListener("error", () => {
      img.hidden = true;
      const frame = img.closest(".image-frame") || img.parentElement;
      if (frame) frame.classList.add("is-missing");
    });
  });

  let lastFocus = null;
  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    const focusTarget = $("input,textarea,button,a", modal);
    if (focusTarget) focusTarget.focus();
  };
  const closeModals = () => {
    $$(".modal.is-open").forEach((modal) => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
    });
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  };
  $$("[data-open-modal]").forEach((button) => button.addEventListener("click", () => openModal(button.dataset.openModal)));
  $$("[data-close-modal]").forEach((button) => button.addEventListener("click", closeModals));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModals();
  });

  const lightbox = $("#lightbox-modal");
  const lightboxImage = $("[data-lightbox-image]");
  $$("[data-lightbox-src]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!lightboxImage) return;
      lightboxImage.src = button.dataset.lightboxSrc;
      lightboxImage.alt = button.dataset.lightboxAlt || "Preview image";
      openModal("lightbox-modal");
    });
  });

  $$("[data-filter-group]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      const value = button.dataset.filter;
      $$("[data-filter]", group).forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      $$("[data-category]").forEach((card) => card.classList.toggle("is-hidden", value !== "all" && card.dataset.category !== value));
    });
  });

  const updateSelectedPackage = (name, price) => {
    $$("[data-selected-package]").forEach((input) => { input.value = name; });
    const sticky = $("[data-sticky-cta]");
    if (sticky) sticky.textContent = SITE.shortName + " - " + name;
    document.body.dataset.selectedPackage = name;
    document.body.dataset.selectedPrice = price || "";
  };
  $$("[data-package]").forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-package]").forEach((item) => item.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      updateSelectedPackage(button.dataset.package, button.dataset.price);
    });
  });

  $$("[data-selector-group]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("[data-select-card]");
      if (!button) return;
      $$("[data-select-card]", group).forEach((item) => item.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      document.body.dataset.lastSelection = button.textContent.trim();
    });
  });

  $$("[data-tab-group]").forEach((group) => {
    const output = $("[data-tab-output]", group);
    group.addEventListener("click", (event) => {
      const button = event.target.closest("[data-tab]");
      if (!button) return;
      $$("[data-tab]", group).forEach((item) => item.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      if (output) output.textContent = button.textContent.trim() + " selected - include this in the request note.";
    });
  });

  const updateStatus = () => {
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60;
    $$("[data-business-status]").forEach((el) => {
      const open = Number(el.dataset.open || 0);
      const close = Number(el.dataset.close || 24);
      const isOpen = hour >= open && hour < close;
      el.textContent = isOpen ? "Open now - good time to contact" : "Closed now - send request for next slot";
      el.classList.toggle("is-open", isOpen);
    });
  };
  updateStatus();
  setInterval(updateStatus, 60000);

  $$("[data-countdown]").forEach((el) => {
    const end = Date.now() + Number(el.dataset.hours || 24) * 60 * 60 * 1000;
    const tick = () => {
      const left = Math.max(0, end - Date.now());
      const hours = Math.floor(left / 3600000);
      const minutes = Math.floor((left % 3600000) / 60000);
      el.textContent = hours + "h " + String(minutes).padStart(2, "0") + "m left for campaign window";
    };
    tick();
    setInterval(tick, 30000);
  });

  $$("[data-review-carousel]").forEach((carousel) => {
    const cards = $$("[data-review-card]", carousel);
    let index = 0;
    const show = (next) => {
      index = (next + cards.length) % cards.length;
      cards.forEach((card, cardIndex) => card.classList.toggle("is-active", cardIndex === index));
    };
    const prev = $("[data-review-prev]", carousel);
    const next = $("[data-review-next]", carousel);
    if (prev) prev.addEventListener("click", () => show(index - 1));
    if (next) next.addEventListener("click", () => show(index + 1));
  });

  $$("[data-before-after-range]").forEach((range) => {
    const wrapper = range.closest("[data-before-after]");
    const update = () => wrapper?.style.setProperty("--ba-pos", range.value + "%");
    range.addEventListener("input", update);
    update();
  });

  const audioButton = $("[data-audio-toggle]");
  if (audioButton) {
    let audioContext = null;
    audioButton.addEventListener("click", async () => {
      const player = audioButton.closest("[data-audio-player]");
      player?.classList.toggle("is-playing");
      audioButton.textContent = player?.classList.contains("is-playing") ? "Stop sample tone" : "Play sample tone";
      if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === "suspended") await audioContext.resume();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      gain.gain.value = 0.03;
      osc.frequency.value = 220;
      osc.connect(gain).connect(audioContext.destination);
      osc.start();
      setTimeout(() => osc.stop(), 380);
    });
  }

  const buildMessage = () => {
    const name = $("[data-field='name']")?.value.trim() || "";
    const time = $("[data-field='time']")?.value.trim() || "";
    const notes = $("[data-field='notes']")?.value.trim() || "";
    const selectedPackage = $("[data-selected-package]")?.value || document.body.dataset.selectedPackage || "Belum pilih paket";
    const selectedPrice = document.body.dataset.selectedPrice || "";
    return [SITE.defaultIntent, "Brand: " + SITE.brand, "Nama: " + (name || "-"), "Pilihan: " + selectedPackage + (selectedPrice ? " (" + selectedPrice + ")" : ""), "Waktu: " + (time || "-"), "Catatan: " + (notes || "-")].join("\n");
  };
  const updateWhatsapp = () => {
    const message = buildMessage();
    const phone = BUSINESS_WHATSAPP.trim();
    const url = phone ? "https://wa.me/" + phone + "?text=" + encodeURIComponent(message) : "https://wa.me/?text=" + encodeURIComponent(message);
    $$("[data-whatsapp-link], [data-sticky-cta]").forEach((link) => { link.href = url; });
    return url;
  };
  $$("[data-whatsapp-generate]").forEach((button) => {
    button.addEventListener("click", () => {
      const form = button.closest("[data-lead-form]");
      const error = $("[data-form-error]", form || document);
      if (form && !form.checkValidity()) {
        if (error) error.textContent = "Please fill name and preferred time first.";
        form.reportValidity();
        return;
      }
      if (error) error.textContent = "WhatsApp message generated. Use the button beside it.";
      const url = updateWhatsapp();
      const link = $("[data-whatsapp-link]", form || document);
      if (link) link.classList.add("is-ready");
      if (navigator.clipboard) navigator.clipboard.writeText(buildMessage()).catch(() => {});
      return url;
    });
  });
  $$("[data-field]").forEach((field) => field.addEventListener("input", updateWhatsapp));
  updateWhatsapp();
})();