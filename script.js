// script.js

// 1) Navbar scroll style
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// 2) Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });
}

// 3) Scroll-fade animation
const fadeEls = document.querySelectorAll(".scroll-fade");
if (fadeEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 }
  );
  fadeEls.forEach((el) => observer.observe(el));
}

// 4) Tab switching logic (no scrolling)
const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

if (tabs.length && tabContents.length) {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active from all tabs & panels
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Add active to clicked tab & correct panel
      tab.classList.add("active");
      const targetPanel = document.getElementById(tab.dataset.target);
      if (targetPanel) targetPanel.classList.add("active");
    });
  });
}

// 5) Sticky tabs shadow on scroll (optional)
const tabsRow = document.querySelector(".tabs");
if (tabsRow) {
  window.addEventListener("scroll", () => {
    const offset = tabsRow.getBoundingClientRect().top;
    if (offset <= 90) {
      tabsRow.classList.add("stuck");
    } else {
      tabsRow.classList.remove("stuck");
    }
  });
}

// 6) Scroll-to-top button
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
