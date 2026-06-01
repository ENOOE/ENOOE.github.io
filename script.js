const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");
const year = document.querySelector("#year");

// Keep the copyright year current without editing HTML every year.
if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile navigation toggle.
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });
}

// Close the mobile menu after selecting a section.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation menu");
  });
});

// Add a light shadow to the sticky header after scrolling.
const updateHeaderShadow = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeaderShadow();
window.addEventListener("scroll", updateHeaderShadow, { passive: true });

// Highlight the navigation item for the section currently in view.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0.01,
  }
);

sections.forEach((section) => observer.observe(section));
