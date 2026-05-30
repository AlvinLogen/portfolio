const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("mobile-menu");

hamburgerBtn.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");

  if (isOpen) {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
    mobileMenu.setAttribute("aria-hidden", "true");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  } else {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");
    mobileMenu.setAttribute("aria-hidden", "false");
    hamburgerBtn.setAttribute("aria-expanded", "true");
  }
});

document.addEventListener("click", (event) => {
  const header = document.querySelector("header");

  if (
    !header.contains(event.target) &&
    !mobileMenu.classList.contains("hidden")
  ) {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
    mobileMenu.setAttribute("aria-hidden", "true");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }
});

function highlightActiveLink() {
  // window.location.pathname returns e.g. '/index.html' or '/about.html'
  const currentPath = window.location.pathname;

  const allNavLinks = document.querySelectorAll("nav a #mobile-menu a");
  allNavLinks.forEach((link) => {
    if (currentPath.endsWith(link.getAttribute("href"))) {
      link.style.setProperty("color", "var(--color-accent)");
      link.style.setProperty("font-weight", "700");
    }
  });
}

highlightActiveLink();
