/* =========================================================
   Portofolio Hernandez — JavaScript Utama
   Fitur: Dark/Light mode, menu mobile, scroll reveal,
   typing effect, filter proyek, navbar aktif, form kontak
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1. DARK / LIGHT MODE ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");

  function getStoredTheme() {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      /* abaikan bila localStorage tidak tersedia */
    }
  }

  function applyInitialTheme() {
    const saved = getStoredTheme();
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(saved || (prefersDark ? "dark" : "light"));
  }

  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
  });

  /* ---------- 2. NAVBAR: scroll state ---------- */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
  });

  /* ---------- 3. MENU MOBILE ---------- */
  const burger = document.getElementById("nav-burger");
  const navLinks = document.getElementById("nav-links");

  function toggleMenu(forceClose) {
    const open = forceClose ? false : !navLinks.classList.contains("open");
    navLinks.classList.toggle("open", open);
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  }

  burger.addEventListener("click", () => toggleMenu());
  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => toggleMenu(true))
  );

  /* ---------- 4. TYPING EFFECT ---------- */
  const typeEl = document.getElementById("type-text");
  const roles = [
    "Mahasiswa IT",
    "Web Developer",
    "Frontend Enthusiast",
    "HTML5 & CSS Lover",
  ];

  if (typeEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const current = roles[roleIndex];
      if (deleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typeEl.textContent = current.slice(0, charIndex);

      let delay = deleting ? 40 : 90;

      if (!deleting && charIndex === current.length) {
        delay = 1600;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
      }

      setTimeout(typeLoop, delay);
    }

    typeLoop();
  }

  /* ---------- 5. NAVBAR LINK AKTIF (scroll spy) ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinkItems = document.querySelectorAll(".nav-link");

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinkItems.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => spy.observe(section));

  /* ---------- 6. RENDER PROYEK + FILTER ---------- */
  const grid = document.getElementById("projects-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  function buildProjectCard(p) {
    const article = document.createElement("article");
    article.className = "project-card reveal";
    article.dataset.category = p.category;

    article.innerHTML = `
      <div class="project-thumb"><span aria-hidden="true">${p.icon}</span></div>
      <div class="project-body">
        <div class="project-tags">
          ${p.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-links">
          <a href="${p.repo}" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="${p.demo}" target="_blank" rel="noopener noreferrer">Demo</a>
        </div>
      </div>
    `;
    return article;
  }

  projects.forEach((p) => grid.appendChild(buildProjectCard(p)));

  const allCards = Array.from(grid.querySelectorAll(".project-card"));

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const filter = btn.dataset.filter;
      allCards.forEach((card) => {
        const show = filter === "semua" || card.dataset.category === filter;
        card.classList.toggle("hide", !show);
      });
    });
  });

  /* ---------- 7. SCROLL REVEAL + PROGRESS BAR ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target
            .querySelectorAll(".skill-meter span")
            .forEach((bar) => bar.classList.add("animate"));
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- 8. FORM KONTAK (demo) ---------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    if (!nama || !email || !pesan) {
      status.textContent = "Mohon isi semua kolom terlebih dahulu.";
      status.className = "form-status error";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Format email tidak valid.";
      status.className = "form-status error";
      return;
    }

    status.textContent = "Terima kasih! Pesan Anda sudah siap dikirim (demo).";
    status.className = "form-status success";
    form.reset();
  });

  /* ---------- 9. TAHUN OTOMATIS DI FOOTER ---------- */
  const yearEl = document.querySelector(".footer-text");
  if (yearEl) {
    const match = yearEl.textContent.match(/© (\d{4})/);
    if (match) {
      yearEl.textContent = yearEl.textContent.replace(match[1], new Date().getFullYear());
    }
  }

  /* ---------- INIT ---------- */
  applyInitialTheme();
})();