// theme.js - dark/light toggle with OS preference detection and localStorage

const THEME_KEY = "portfolio-theme";
const htmlEl = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");

function applyTheme(theme) {
  htmlEl.dataset.theme = theme;
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem(THEME_KEY, theme);
}

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") return saved;

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";

  return "light";
}

applyTheme(getInitialTheme());

toggleBtn.addEventListener("click", () => {
  const current = htmlEl.dataset.theme;
  applyTheme(current === "dark" ? "light" : "dark");
});
