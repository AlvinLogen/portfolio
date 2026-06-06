// github.js - Github API fetch + transformers

const GITHUB_USERNAME = "AlvinLogen";
const API_BASE = "https://api.github.com";
const MAX_REPOS = 20;

async function fetchFromGitHub(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Github API error: ${response.status} on ${endpoint}`);
  }

  return response.json();
}

async function loadGitHubStats() {
  const statsContainer = document.getElementById("stats-container");
  if (!statsContainer) return;

  try {
    const user = await fetchFromGitHub(`/users/${GITHUB_USERNAME}`);

    const stats = [
      { label: "Public Repos", value: user.public_repos },
      { label: "Followers", value: user.followers },
      { label: "Following", value: user.following },
      { label: "Member Since", value: new Date(user.created_at).getFullYear() },
    ];

    statsContainer.innerHTML = stats
      .map(
        (stat) =>
          `<div class="p-6 rounded-xl border" style="border-color: var(--color-border); background-color: var(--color-bg-secondary);">
            <p class="text-3xl font-bold mb-1" style="color: var(--color-accent);">${stat.value}</p>
            <p class="text-sm" style="color: var(--color-text-muted);">${stat.label}</p>
        </div>
        `,
      )
      .join("");
  } catch (error) {
    statsContainer.innerHTML = `<p style="color: var(--color-text-muted);">Could not load GitHub stats.</p>`;
    console.error("loadGitHubStats: ", error.message);
  }
}

function buildRepoCard(repo) {
  const language = repo.language || "Unknown";
  const stars = repo.stargazers_count;
  const updatedDate = new Date(repo.pushed_at).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
  });

  return `
    <article class="rounded-xl border p-6 flex flex-col gap-3 transition-shadow hover: shadow-log" style="border-color: var(--color-border); background-color: var(--color-bg-secondary);" data-language="${language}">
        <div class="flex justify-between item0start gap-2">
            <h3 class="font-semibold text-base leading-tight">${repo.name}</h3>
            <span class="text-xs px-2 py-0.5 rounded-full shrink-0" style="background-color: var(--color-accent); color: #fff;">${language}</span>
        </div>
        <p class="text-sm flex-1" style="color: var(--color-text-muted);">${repo.description || "No description provided."}</p>
        <div class="flex justify-between items-center text-xs" style="color: var(--color-text-muted);">
            <span>⭐ ${stars}</span>
            <span>Updated ${updatedDate}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="text-sm font-medium underline underline-offset-4 mt-auto" style="color: var(--color-accent);">
        View on GitHub -> 
        </a>
    </article>
  `;
}

async function loadProjects() {
  const projectsGrid = document.getElementById("projects-grid");
  const filterContainer = document.getElementById("filter-container");
  if (!projectsGrid) return;

  try {
    const repos = await fetchFromGitHub(
      `/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=${MAX_REPOS}`,
    );

    projectsGrid.innerHTML = repos.map((repo) => buildRepoCard(repo)).join("");

    const languages = [
      "All",
      ...new Set(repos.map((r) => r.language).filter(Boolean)),
    ];

    filterContainer.innerHTML = languages
      .map(
        (language) => `
    <button class="language-filter-btn px-4 py-1.5 rounded-full text-sm border transition-colors" style="border-color:var(--color-border);" data-lang="${language}">
    ${language}
    </button>
    `,
      )
      .join("");

    filterContainer.addEventListener("click", (event) => {
      const btn = event.target.closest(".language-filter-btn");
      if (!btn) return;

      const selectLang = btn.dataset.lang;
      const allCards = projectsGrid.querySelectorAll("article[data-language]");

      allCards.forEach((card) => {
        const matches =
          selectLang === "All" || card.dataset.language === selectLang;
        card.style.display = matches ? "" : "none";
      });
    });
  } catch (error) {
    projectsGrid.innerHTML = `<p style="color: var(--color-text-muted);">Could not load projects.</p>`;
    console.error("loadProjects: ", error.message);
  }
}

loadGitHubStats();
loadProjects();
