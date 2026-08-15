/* =========================================================
   HERNANDEZ — JS UTAMA (Neo-Brutalist)
   Fitur: tema, custom cursor, tilt 3D, scroll progress,
   menu mobile, scroll-spy, render+filter proyek, reveal,
   seg-bar level, form kontak.
   ========================================================= */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. TEMA ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) { /* abaikan */ }
  }

  function applyInitialTheme() {
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) { /* abaikan */ }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(saved || (prefersDark ? "dark" : "light"));
  }

  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
  });

  /* ---------- 2. NAVBAR STATE ---------- */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  /* ---------- 3. SCROLL PROGRESS BAR ---------- */
  const progressBar = document.getElementById("scroll-progress");
  function updateProgress() {
    const h = document.documentElement;
    const max = h.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.width = pct.toFixed(2) + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });

  /* ---------- 4. MENU MOBILE ---------- */
  const burger = document.getElementById("nav-burger");
  const navLinks = document.getElementById("nav-links");

  function setMenu(open) {
    navLinks.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  }
  burger.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  navLinks.querySelectorAll("a").forEach((l) => l.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- 5. TILT 3D ---------- */
  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".tilt").forEach((el) => {
      const max = 6;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          "rotate(" + (1.6 - py * max) + "deg) rotateY(" + px * 6 + "deg) rotateX(" + -py * 6 + "deg) scale(1.02)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "rotate(1.6deg)";
      });
    });
  }

  /* ---------- 7. SCROLL-SPY ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: "-38% 0px -55% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- 8. RENDER PROYEK ---------- */
  const grid = document.getElementById("projects-grid");

  function buildProjectCard(p, i) {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    card.dataset.category = p.category;
    card.style.setProperty("--thumb-accent", p.tint || "var(--accent)");

    const idx = String(i + 1).padStart(2, "0");
    card.innerHTML =
      '<div class="project-thumb" aria-hidden="true">' +
        '<span class="project-code">' + p.code + "</span>" +
        '<span class="project-idx">' + idx + "</span>" +
      "</div>" +
      '<div class="project-body">' +
        '<div class="project-meta mono"><span>' + p.year + '</span><span>' + p.category.toUpperCase() + "</span></div>" +
        "<h3>" + p.title + "</h3>" +
        "<p>" + p.description + "</p>" +
        '<div class="project-tags">' +
          p.tags.map((t) => "<span>" + t + "</span>").join("") +
        "</div>" +
        '<div class="project-links">' +
          '<a href="' + p.repo + '" target="_blank" rel="noopener noreferrer">GITHUB ↗</a>' +
          '<a href="' + p.demo + '" target="_blank" rel="noopener noreferrer">DEMO ↗</a>' +
        "</div>" +
      "</div>";

    return card;
  }

  projects.forEach((p, i) => grid.appendChild(buildProjectCard(p, i)));

  const allCards = Array.from(grid.querySelectorAll(".project-card"));

  /* ---------- 9. FILTER PROYEK ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const f = btn.dataset.filter;
      allCards.forEach((card) => {
        const show = f === "semua" || card.dataset.category === f;
        card.classList.toggle("hide", !show);
      });
    });
  });

  /* ---------- 10. REVEAL + SEG BAR LEVEL ---------- */
  function activateSeg(bar) {
    const level = parseInt(bar.dataset.level, 10) || 0;
    const segs = bar.querySelectorAll(".seg");
    const on = Math.round((level / 100) * segs.length);
    segs.forEach((seg, idx) => {
      seg.classList.add(idx < on ? "on" : "off");
      seg.style.transitionDelay = idx * 45 + "ms";
    });
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.delay, 10) || 0;
        el.style.transitionDelay = delay + "ms";
        el.classList.add("visible");
        el.querySelectorAll(".seg-bar").forEach(activateSeg);
        el.querySelectorAll(".seg-bar").forEach((bar) => bar.classList.add("animate"));
        revealObserver.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- 11. FORM KONTAK ---------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    if (!nama || !email || !pesan) {
      status.textContent = "ISI SEMUA KOLOM, DULU.";
      status.className = "form-status error";
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "FORMAT EMAIL: salah.";
      status.className = "form-status error";
      return;
    }
    status.textContent = "TERKIRIM (demo) — pesan Anda aman di sini.";
    status.className = "form-status success";
    form.reset();
  });

  /* ---------- 12. TAHUN FOOTER ---------- */
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 13. SEAMLESS MARQUEE (duplikasi konten) ---------- */
  document.querySelectorAll(".marquee-track").forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- INIT ---------- */
  applyInitialTheme();
  updateProgress();
})();