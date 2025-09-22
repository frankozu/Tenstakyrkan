// script.js
document.addEventListener("DOMContentLoaded", () => {
  /* ----------------- 1) Navbar scroll style ----------------- */
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  /* ----------------- 2) Mobile menu toggle ----------------- */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("open");
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("open");
      });
    });
  }

  /* ----------------- 3) Scroll-fade animation ----------------- */
  const fadeEls = document.querySelectorAll(".scroll-fade");
  if (fadeEls.length) {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      }),
      { threshold: 0.2 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  }

  /* ----------------- 4) Tab switching ----------------- */
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  if (tabs.length && tabContents.length) {
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tabContents.forEach((c) => c.classList.remove("active"));
        tab.classList.add("active");

        const targetPanel = document.getElementById(tab.dataset.target);
        if (targetPanel) targetPanel.classList.add("active");
      });
    });
  }

  /* ----------------- 4.5) Soft Shadow When Sticky ----------------- */
  const tabsRow = document.querySelector("#about-nav .tabs, #verksamhets-nav .tabs");
  if (tabsRow) {
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "0";
    sentinel.style.height = "1px";
    tabsRow.parentNode.insertBefore(sentinel, tabsRow);

    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--nav-height")
    ) || 64;

    const io = new IntersectionObserver(
      ([entry]) => {
        tabsRow.classList.toggle("is-stuck", entry.intersectionRatio === 0);
      },
      { root: null, rootMargin: `-${navHeight}px 0px 0px 0px`, threshold: [0, 1] }
    );
    io.observe(sentinel);
  }

/* ----------------- 4.6) Mobile Sticky Fallback (Only if sticky fails) ----------------- */
const isStickySupported = CSS.supports("position", "sticky") || CSS.supports("position", "-webkit-sticky");
if (!isStickySupported) {
  document.querySelectorAll('#about-nav .tabs, #verksamhets-nav .tabs').forEach((row) => {
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;

    const spacer = document.createElement('div');
    spacer.style.height = row.offsetHeight + 'px';
    spacer.style.display = 'none';
    row.parentNode.insertBefore(spacer, row);

    let fixed = false;
    let triggerY = row.getBoundingClientRect().top + window.scrollY;

    const recompute = () => {
      spacer.style.height = row.offsetHeight + 'px';
      triggerY = row.getBoundingClientRect().top + window.scrollY;
    };

    const onScroll = () => {
      if (window.scrollY >= triggerY - navH) {
        if (!fixed) {
          fixed = true;
          spacer.style.display = 'block';
          Object.assign(row.style, {
            position: 'fixed',
            top: navH + 'px',
            left: '0',
            right: '0',
            width: '100%',
            background: '#faf7f3',
            zIndex: '1000'
          });
        }
      } else if (fixed) {
        fixed = false;
        spacer.style.display = 'none';
        Object.assign(row.style, { position: '', top: '', left: '', right: '', width: '' });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { recompute(); onScroll(); });
  });
}


  /* ----------------- 5) Scroll-to-top button ----------------- */
  const scrollBtn = document.getElementById("scrollToTop");
  if (scrollBtn) {
    const toggleTopBtn = () => {
      if (window.scrollY > 300) {
        scrollBtn.style.display = "flex";
        scrollBtn.style.opacity = "1";
      } else {
        scrollBtn.style.opacity = "0";
        scrollBtn.style.display = "none";
      }
    };

    window.addEventListener("scroll", toggleTopBtn);
    toggleTopBtn();

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
