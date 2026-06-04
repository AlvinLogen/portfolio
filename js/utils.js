// utils.js - pure utility functions

/**
 * Formats a GitHub API date string into a readable month/year string.
 * @param {string} dateString - ISO 8601 date string (e.g. '2024-11-15T10:30:00Z')
 * @returns {string} e.g. 'Nov 2024'
 * **/

function formatDate(dateString) {
  if (!dateString) return "Unknown";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleDateString("en-GB", { year: "numeric", month: "short" });
}

/**
 * Estimates the read time for a string of text.
 * Assumes 200 words per minute reading speed.
 * @param {string} text
 * @returns {string} e.g. '3 min read'
 * **/

function calculateReadTime(text) {
  if (!text || typeof text !== "string") return "0 min read";

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));

  return `${minutes} min read`;
}

/**
 * Transforms a GitHub API repo object into a simple display object.
 * @param {{ name: string, description: string|null, language: string|null, stargazers_count: number, html_url: string}} repo
 * @returns {{name: string, description: string, language: string, stars: number, url: string }}
 * **/

function transformRepo(repo) {
  return {
    name: repo.name,
    description: repo.description || "No description provided.",
    language: repo.language || "Unknown",
    stars: repo.stargazers_count,
    url: repo.html_url,
  };
}

/**
 * Validates an email address format. Pure function - no DOM, no network. Safe to test with Jest. Uses regex pattern
 * @param {string} email
 * @returns {boolean}
 * **/

function validateEmail(email) {
  if (!email || typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// CommonJS exports

module.exports = {
  formatDate,
  calculateReadTime,
  transformRepo,
  validateEmail,
};
