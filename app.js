import { siteConfig } from "./site-config.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function hydrateConfig() {
  $$('[data-phone-display]').forEach((node) => { node.textContent = siteConfig.contact.phoneDisplay; });
  $$('[data-phone-link]').forEach((node) => { node.href = `tel:${siteConfig.contact.phoneHref}`; });
  $$('[data-address-full]').forEach((node) => { node.textContent = siteConfig.contact.address; });
  $$('[data-directions-link]').forEach((node) => {
    node.href = siteConfig.contact.directionsUrl;
    node.target = "_blank";
    node.rel = "noopener noreferrer";
  });
  const genericMessage = encodeURIComponent("Hello Dr. Saumya Gupta's clinic, I would like to request an appointment.");
  $$('[data-whatsapp-link]').forEach((node) => {
    node.href = `https://wa.me/${siteConfig.contact.whatsapp}?text=${genericMessage}`;
    node.target = "_blank";
    node.rel = "noopener noreferrer";
  });
  $("#year").textContent = new Date().getFullYear();
}

function renderServices() {
  const icons = ["✚", "◉", "♥", "⌁", "◇", "✦", "↗", "◌", "≈", "✣"];
  $("#services-grid").innerHTML = siteConfig.services.map(([title, description], index) => `
    <article class="service-card reveal">
      <span class="service-icon" aria-hidden="true">${icons[index]}</span>
      <h3>${title}</h3>
      <p>${description}</p>
    </article>`).join("");
}

function setupNavigation() {
  const header = $("#site-header");
  const toggle = $(".menu-toggle");
  const nav = $("#primary-nav");
  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  });
  $$("a", nav).forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 24), { passive: true });

  const sections = $$('main section[id]');
  const links = $$('#primary-nav a');
  const updateActive = () => {
    let active = "home";
    sections.forEach((section) => { if (window.scrollY >= section.offsetTop - 150) active = section.id; });
    links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${active}`));
  };
  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();
}

function setupSlider() {
  const hero = $(".hero");
  const slides = $$(".hero-slide", hero);
  const dotsWrap = $(".slider-dots", hero);
  let current = 0;
  let timer;
  let touchStart = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.role = "tab";
    dot.setAttribute("aria-label", `Show slide ${index + 1}`);
    dot.addEventListener("click", () => show(index, true));
    dotsWrap.append(dot);
  });
  const dots = $$("button", dotsWrap);

  function show(index, restart = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, idx) => {
      const active = idx === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, idx) => {
      dot.classList.toggle("is-active", idx === current);
      dot.setAttribute("aria-selected", String(idx === current));
    });
    if (restart) start();
  }
  function start() {
    clearInterval(timer);
    if (!reducedMotion) timer = setInterval(() => show(current + 1), 6500);
  }
  $(".slider-prev", hero).addEventListener("click", () => show(current - 1, true));
  $(".slider-next", hero).addEventListener("click", () => show(current + 1, true));
  hero.addEventListener("mouseenter", () => clearInterval(timer));
  hero.addEventListener("mouseleave", start);
  hero.addEventListener("touchstart", (event) => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
  hero.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) show(current + (distance < 0 ? 1 : -1), true);
  }, { passive: true });
  hero.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(current - 1, true);
    if (event.key === "ArrowRight") show(current + 1, true);
  });
  show(0);
  start();
}

function setupReveal() {
  if (reducedMotion || !("IntersectionObserver" in window)) {
    $$(".reveal").forEach((node) => node.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  $$(".reveal").forEach((node) => observer.observe(node));
}

function setupGallery() {
  const items = $$(".gallery-item");
  const lightbox = $("#lightbox");
  const image = $("img", lightbox);
  const caption = $("figcaption", lightbox);
  let visibleItems = items;
  let activeIndex = 0;

  $$(".gallery-filters button").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      $$(".gallery-filters button").forEach((node) => node.classList.toggle("is-active", node === button));
      items.forEach((item) => { item.hidden = filter !== "all" && item.dataset.category !== filter; });
      visibleItems = items.filter((item) => !item.hidden);
    });
  });

  function openItem(item) {
    visibleItems = items.filter((galleryItem) => !galleryItem.hidden);
    activeIndex = visibleItems.indexOf(item);
    image.src = $("img", item).currentSrc || $("img", item).src;
    image.alt = item.dataset.alt;
    caption.textContent = item.dataset.alt;
    lightbox.showModal();
    document.body.classList.add("lightbox-open");
  }
  function move(direction) {
    activeIndex = (activeIndex + direction + visibleItems.length) % visibleItems.length;
    const item = visibleItems[activeIndex];
    image.src = $("img", item).currentSrc || $("img", item).src;
    image.alt = item.dataset.alt;
    caption.textContent = item.dataset.alt;
  }
  items.forEach((item) => item.addEventListener("click", () => openItem(item)));
  $(".lightbox-close", lightbox).addEventListener("click", () => lightbox.close());
  $(".lightbox-prev", lightbox).addEventListener("click", () => move(-1));
  $(".lightbox-next", lightbox).addEventListener("click", () => move(1));
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });
  lightbox.addEventListener("close", () => document.body.classList.remove("lightbox-open"));
}

function setupFaq() {
  $$(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const open = button.getAttribute("aria-expanded") !== "true";
      $$(".faq-item").forEach((other) => {
        other.classList.remove("is-open");
        $("button", other).setAttribute("aria-expanded", "false");
      });
      if (open) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function setupForm() {
  const form = $("#appointment-form");
  const dateInput = $('input[name="date"]', form);
  const error = $("#form-error");
  const success = $("#form-success");
  const submit = $('.form-submit', form);
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  dateInput.min = today.toISOString().split("T")[0];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    error.textContent = "";
    success.hidden = true;
    if (!form.checkValidity()) {
      error.textContent = "Please complete all required fields with valid details.";
      form.reportValidity();
      return;
    }
    const values = Object.fromEntries(new FormData(form));
    submit.disabled = true;
    submit.querySelector("span").textContent = "Preparing Request…";
    const message = [
      "Hello Dr. Saumya Gupta's clinic, I would like to request an appointment.",
      `Name: ${values.name}`,
      `Mobile: ${values.mobile}`,
      `Preferred date: ${values.date}`,
      `Preferred time: ${values.time}`,
      `Health concern: ${values.concern}`,
    ].join("\n");
    setTimeout(() => {
      $("#continue-whatsapp").href = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
      $("#continue-whatsapp").target = "_blank";
      $("#continue-whatsapp").rel = "noopener noreferrer";
      success.hidden = false;
      submit.disabled = false;
      submit.querySelector("span").textContent = "Request Appointment";
      success.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
    }, 500);
  });
}

hydrateConfig();
renderServices();
setupNavigation();
setupSlider();
setupGallery();
setupFaq();
setupForm();
setupReveal();
