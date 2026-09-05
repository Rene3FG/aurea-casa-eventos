"use strict";

(function () {
  const LANG_KEY = "aurea-lang";

  function getLang() {
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (stored === "es" || stored === "en") return stored;
    } catch (e) {}
    return "es";
  }

  function setLang(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    applyLang(lang);
  }

  function applyLang(lang) {
    const dict = window.AUREA_I18N[lang];
    if (!dict) return;

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = window.aureaTranslate(el.getAttribute("data-i18n"), dict);
      if (value != null) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const value = window.aureaTranslate(el.getAttribute("data-i18n-placeholder"), dict);
      if (value != null) el.setAttribute("placeholder", value);
    });

    document.querySelectorAll("[data-i18n-attr-content]").forEach((el) => {
      const value = window.aureaTranslate(el.getAttribute("data-i18n-attr-content"), dict);
      if (value != null) el.setAttribute("content", value);
    });

    const title = window.aureaTranslate("meta.title", dict);
    if (title) document.title = title;

    const langToggle = document.getElementById("lang-toggle");
    if (langToggle) {
      langToggle.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
      langToggle.querySelectorAll("[data-lang-es]").forEach((el) => el.classList.toggle("active", lang === "es"));
      langToggle.querySelectorAll("[data-lang-en]").forEach((el) => el.classList.toggle("active", lang === "en"));
    }
  }

  function initLangToggle() {
    const btn = document.getElementById("lang-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      setLang(getLang() === "es" ? "en" : "es");
    });
    applyLang(getLang());
  }

  function initMobileMenu() {
    const menuButton = document.getElementById("menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    if (!menuButton || !mobileMenu) return;

    function close() {
      menuButton.classList.remove("open");
      mobileMenu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }

    menuButton.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      menuButton.classList.toggle("open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    mobileMenu.querySelectorAll("a, button").forEach((el) => el.addEventListener("click", close));
  }

  function initScrollButtons() {
    document.querySelectorAll("[data-scroll-to]").forEach((el) => {
      el.addEventListener("click", () => {
        const target = document.querySelector(el.getAttribute("data-scroll-to"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function initFaqAccordion() {
    document.querySelectorAll(".faq-list article").forEach((article) => {
      const button = article.querySelector("button");
      if (!button) return;
      button.addEventListener("click", () => {
        const isOpen = article.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));
      });
    });
  }

  function initGalleryFilter() {
    const filters = document.querySelectorAll(".gallery-filters button");
    const cards = document.querySelectorAll(".gallery-card");
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");
        cards.forEach((card) => {
          const show = filter === "all" || card.getAttribute("data-zone") === filter;
          card.hidden = !show;
        });
      });
    });
  }

  function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("lightbox-close");
    if (!lightbox || !lightboxImg || !closeBtn) return;

    function open(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || "";
      lightbox.hidden = false;
    }
    function close() {
      lightbox.hidden = true;
      lightboxImg.src = "";
    }

    document.querySelectorAll(".gallery-card").forEach((card) => {
      card.addEventListener("click", () => {
        const img = card.querySelector("img");
        if (img) open(img.currentSrc || img.src, img.alt);
      });
    });

    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) close(); });
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    const successMsg = document.getElementById("form-success");
    const errorMsg = document.getElementById("form-error");
    if (!form) return;

    const submitBtn = form.querySelector("button[type=submit]");
    const email = form.getAttribute("action").split("/").pop();
    const ajaxUrl = "https://formsubmit.co/ajax/" + email;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      errorMsg.hidden = true;
      submitBtn.disabled = true;

      try {
        const response = await fetch(ajaxUrl, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form)
        });
        if (!response.ok) throw new Error("request failed");

        form.hidden = true;
        successMsg.hidden = false;
      } catch (err) {
        errorMsg.hidden = false;
        submitBtn.disabled = false;
      }
    });
  }

  function initFooterYear() {
    const el = document.getElementById("footer-year");
    if (el) el.textContent = "© " + new Date().getFullYear() + " Aurea";
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLangToggle();
    initMobileMenu();
    initScrollButtons();
    initFaqAccordion();
    initGalleryFilter();
    initLightbox();
    initContactForm();
    initFooterYear();
  });
})();
