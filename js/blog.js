const posts = [
  {
    title: "What I learned building Github portfolio",
    date: "2026-05-05",
    tags: ["javascript", "github-api", "portfolio"],
    summary:
      "Connecting to an external API for the first time, handing rate limits, and the moment .map() went from abstract to concrete.",
    readTime: "3 min read",
  },
  {
    title: "Why I stopped copy-pasting and started typing",
    date: "2026-05-10",
    tags: ["learning", "habits"],
    summary:
      "Copy-paste feels productive. It is not. Every line I typed myself is still in my memory. Nothing I copied is.",
    readTime: "2 min read",
  },
];

function renderPosts() {
  const container = document.getElementById("posts-container");
  if (!container) return;

  container.innerHTML = posts
    .map(
      (post) =>
        `
        <article class="rounded-xl border p-6 flex flex-col gap-3" style="border-color: var(--color-border); background-color: var(--color-bg-secondary);">
        <div class="flex justify-between items-start gap-2 flex-wrap">
        <h2 class="font-semibold text-lg leading-tight">${post.title}</h2>
        <span class="text-xs shrink-0" style="color: var(--color-text-muted);">${post.readTime}</span>
        </div>
        <p class="text-sm" style="color: var(--color-text-muted);">${post.summary}</p>
        <div class="flex gap-2 flex-wrap">
        ${post.tags.map((tag) => `<span class="text-xs px-2 py-0.5 rounded-full border" style="border-color: var(--color-border);">${tag}</span>`).join("")}
        </div>
        <p class="text-xs" style="color: var(--color-text-muted);">${new Date(post.date).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</p>
        </article>
      `,
    )
    .join("");
}

if (typeof module !== "undefined") module.exports = { posts };

renderPosts();
