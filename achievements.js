const achievements = [
  {
    image: "/assets/achievement-certificates.webp",
    eyebrow: "Qualifications & CME",
    title: "Professional Qualifications & Certifications",
    text: "Medical registration, academic credentials and continuing medical education milestones.",
    alt: "Framed medical qualifications and professional certificates of Dr. Saumya Gupta",
  },
  {
    image: "/assets/achievement-award-ceremony.webp",
    eyebrow: "Professional Recognition",
    title: "Recognition at a Medical Conference",
    text: "A milestone from Dr. Saumya Gupta’s continuing professional and academic journey.",
    alt: "Dr. Saumya Gupta receiving professional recognition at a medical conference",
  },
  {
    image: "/assets/achievement-professional-award.webp",
    eyebrow: "Achievement",
    title: "Professional Recognition & Award",
    text: "Recognition presented during a professional medical event and awards ceremony.",
    alt: "Dr. Saumya Gupta receiving an award during a professional medical event",
  },
  {
    image: "/assets/achievement-esi-symposium.webp",
    eyebrow: "ESI · Bhopal · 2022",
    title: "ESI Central India Symposium 2022",
    text: "Professional recognition at the Central India Symposium in Bhopal.",
    alt: "Dr. Saumya Gupta receiving recognition at the ESI Central India Symposium 2022 in Bhopal",
  },
];

const style = document.createElement("style");
style.textContent = `
  .achievements-section {
    position: relative;
    overflow: hidden;
    padding: clamp(4.5rem, 8vw, 7rem) 0;
    background:
      radial-gradient(circle at 12% 18%, rgba(76, 188, 255, .19), transparent 34%),
      radial-gradient(circle at 88% 78%, rgba(32, 220, 184, .13), transparent 32%),
      linear-gradient(135deg, #061e31 0%, #083f66 48%, #05283f 100%);
    color: #fff;
  }
  .achievements-section::before,
  .achievements-section::after {
    content: "";
    position: absolute;
    width: 19rem;
    height: 19rem;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,.08);
    pointer-events: none;
    animation: achievementOrbit 12s ease-in-out infinite alternate;
  }
  .achievements-section::before { left: -8rem; top: -9rem; }
  .achievements-section::after { right: -7rem; bottom: -9rem; animation-delay: -5s; }
  .achievements-head {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    align-items: end;
    margin-bottom: 2rem;
  }
  .achievements-kicker {
    margin: 0 0 .55rem;
    color: #85e5ff;
    font-size: .78rem;
    font-weight: 800;
    letter-spacing: .15em;
    text-transform: uppercase;
  }
  .achievements-head h2 {
    margin: 0;
    color: #fff;
    max-width: 650px;
    font-size: clamp(2rem, 4vw, 3.25rem);
    line-height: 1.05;
  }
  .achievements-head > p {
    max-width: 410px;
    margin: 0;
    color: rgba(255,255,255,.75);
    line-height: 1.7;
  }
  .achievement-slider {
    position: relative;
    padding: 0 3.35rem;
  }
  .achievement-viewport {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    scroll-behavior: smooth;
    border-radius: 1.35rem;
  }
  .achievement-viewport::-webkit-scrollbar { display: none; }
  .achievement-track {
    display: flex;
    gap: 1.15rem;
    padding: .35rem .1rem 1rem;
  }
  .achievement-card {
    flex: 0 0 min(78vw, 365px);
    scroll-snap-align: center;
    overflow: hidden;
    position: relative;
    border-radius: 1.25rem;
    border: 1px solid rgba(255,255,255,.18);
    background: rgba(255,255,255,.095);
    box-shadow: 0 22px 55px rgba(0,0,0,.25);
    backdrop-filter: blur(12px);
    transform: translateY(0);
    transition: transform .45s ease, border-color .45s ease, box-shadow .45s ease;
  }
  .achievement-card:hover {
    transform: translateY(-8px);
    border-color: rgba(133,229,255,.58);
    box-shadow: 0 28px 70px rgba(0,0,0,.35);
  }
  .achievement-media {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    background: #0a2c47;
  }
  .achievement-media::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(4,24,39,.42), transparent 48%);
    pointer-events: none;
  }
  .achievement-media img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transform: scale(1.01);
    transition: transform 1s cubic-bezier(.2,.7,.2,1), filter .45s ease;
  }
  .achievement-card:hover img { transform: scale(1.075); filter: saturate(1.08) contrast(1.03); }
  .achievement-number {
    position: absolute;
    top: .85rem;
    right: .85rem;
    z-index: 2;
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 999px;
    color: #06243a;
    background: rgba(255,255,255,.92);
    font-weight: 900;
    font-size: .82rem;
    box-shadow: 0 8px 24px rgba(0,0,0,.18);
  }
  .achievement-copy { padding: 1.25rem 1.3rem 1.4rem; }
  .achievement-copy span {
    display: block;
    color: #8ceaff;
    font-size: .72rem;
    font-weight: 800;
    letter-spacing: .12em;
    text-transform: uppercase;
    margin-bottom: .5rem;
  }
  .achievement-copy h3 {
    margin: 0 0 .55rem;
    color: #fff;
    font-size: 1.18rem;
    line-height: 1.25;
  }
  .achievement-copy p {
    margin: 0;
    color: rgba(255,255,255,.72);
    font-size: .92rem;
    line-height: 1.6;
  }
  .achievement-arrow {
    position: absolute;
    top: 50%;
    z-index: 5;
    width: 2.75rem;
    height: 2.75rem;
    margin-top: -1.4rem;
    border: 1px solid rgba(255,255,255,.24);
    border-radius: 999px;
    background: rgba(6,30,49,.84);
    color: #fff;
    font-size: 1.6rem;
    cursor: pointer;
    box-shadow: 0 10px 26px rgba(0,0,0,.28);
    transition: transform .25s ease, background .25s ease;
  }
  .achievement-arrow:hover { transform: scale(1.08); background: #0a6fa6; }
  .achievement-prev { left: 0; }
  .achievement-next { right: 0; }
  .achievement-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .48rem;
    margin-top: 1rem;
  }
  .achievement-dot {
    width: .48rem;
    height: .48rem;
    border: 0;
    border-radius: 999px;
    background: rgba(255,255,255,.34);
    cursor: pointer;
    transition: width .3s ease, background .3s ease;
  }
  .achievement-dot.is-active { width: 1.7rem; background: #86e7ff; }
  @keyframes achievementOrbit {
    from { transform: translate3d(0,0,0) scale(1); }
    to { transform: translate3d(22px,18px,0) scale(1.08); }
  }
  @media (max-width: 760px) {
    .achievements-head { display: block; }
    .achievements-head > p { margin-top: 1rem; }
    .achievement-slider { padding: 0 2.5rem; }
    .achievement-card { flex-basis: min(82vw, 340px); }
    .achievement-arrow { width: 2.35rem; height: 2.35rem; font-size: 1.35rem; }
  }
  @media (max-width: 520px) {
    .achievement-slider { padding: 0; }
    .achievement-arrow { display: none; }
    .achievement-card { flex-basis: 87vw; }
  }
  @media (prefers-reduced-motion: reduce) {
    .achievements-section::before, .achievements-section::after { animation: none; }
    .achievement-viewport { scroll-behavior: auto; }
    .achievement-card, .achievement-media img { transition: none; }
  }
`;
document.head.append(style);

const gallery = document.querySelector("#gallery");
if (gallery) {
  const section = document.createElement("section");
  section.className = "achievements-section";
  section.id = "achievements";
  section.innerHTML = `
    <div class="container">
      <div class="achievements-head reveal">
        <div>
          <p class="achievements-kicker">Professional milestones</p>
          <h2>Achievements & Recognition</h2>
        </div>
        <p>Qualifications, continued medical education and moments of professional recognition from Dr. Saumya Gupta’s medical journey.</p>
      </div>
      <div class="achievement-slider reveal" aria-label="Achievements carousel">
        <button class="achievement-arrow achievement-prev" type="button" aria-label="Previous achievement">‹</button>
        <div class="achievement-viewport" tabindex="0">
          <div class="achievement-track">
            ${achievements.map((item, index) => `
              <article class="achievement-card">
                <div class="achievement-media">
                  <img src="${item.image}" alt="${item.alt}" loading="lazy" decoding="async" />
                  <span class="achievement-number">${String(index + 1).padStart(2, "0")}</span>
                </div>
                <div class="achievement-copy">
                  <span>${item.eyebrow}</span>
                  <h3>${item.title}</h3>
                  <p>${item.text}</p>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
        <button class="achievement-arrow achievement-next" type="button" aria-label="Next achievement">›</button>
      </div>
      <div class="achievement-dots" aria-label="Choose achievement">
        ${achievements.map((_, index) => `<button class="achievement-dot${index === 0 ? " is-active" : ""}" type="button" aria-label="Show achievement ${index + 1}"></button>`).join("")}
      </div>
    </div>
  `;
  gallery.before(section);

  const nav = document.querySelector("#primary-nav");
  const galleryLink = nav?.querySelector('a[href="#gallery"]');
  if (nav && galleryLink && !nav.querySelector('a[href="#achievements"]')) {
    const link = document.createElement("a");
    link.href = "#achievements";
    link.textContent = "Achievements";
    nav.insertBefore(link, galleryLink);
  }

  document.querySelectorAll('footer a[href="#gallery"]').forEach((galleryFooterLink) => {
    if (galleryFooterLink.parentElement?.querySelector('a[href="#achievements"]')) return;
    const link = document.createElement("a");
    link.href = "#achievements";
    link.textContent = "Achievements";
    galleryFooterLink.before(link);
  });

  const viewport = section.querySelector(".achievement-viewport");
  const cards = [...section.querySelectorAll(".achievement-card")];
  const dots = [...section.querySelectorAll(".achievement-dot")];
  const prev = section.querySelector(".achievement-prev");
  const next = section.querySelector(".achievement-next");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let timer;

  const setDots = () => dots.forEach((dot, index) => dot.classList.toggle("is-active", index === current));
  const go = (index, restart = false) => {
    current = (index + cards.length) % cards.length;
    viewport.scrollTo({ left: cards[current].offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
    setDots();
    if (restart) startAuto();
  };
  const startAuto = () => {
    window.clearInterval(timer);
    if (!reduceMotion) timer = window.setInterval(() => go(current + 1), 4600);
  };
  const stopAuto = () => window.clearInterval(timer);

  prev?.addEventListener("click", () => go(current - 1, true));
  next?.addEventListener("click", () => go(current + 1, true));
  dots.forEach((dot, index) => dot.addEventListener("click", () => go(index, true)));
  viewport.addEventListener("mouseenter", stopAuto);
  viewport.addEventListener("mouseleave", startAuto);
  viewport.addEventListener("focusin", stopAuto);
  viewport.addEventListener("focusout", startAuto);
  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") { event.preventDefault(); go(current + 1, true); }
    if (event.key === "ArrowLeft") { event.preventDefault(); go(current - 1, true); }
  });

  let scrollTimer;
  viewport.addEventListener("scroll", () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      const left = viewport.scrollLeft;
      let closest = 0;
      let distance = Infinity;
      cards.forEach((card, index) => {
        const value = Math.abs(card.offsetLeft - left);
        if (value < distance) { distance = value; closest = index; }
      });
      current = closest;
      setDots();
    }, 90);
  }, { passive: true });

  document.addEventListener("visibilitychange", () => document.hidden ? stopAuto() : startAuto());
  startAuto();
}
