// utils.test.js - Jest tests

const {
  formatDate,
  calculateReadTime,
  transformRepo,
  validateEmail,
} = require("../js/utils");

const { posts } = require("../js/blog");

// formatDate

describe("formatDate", () => {
  it("formats a valid ISO date string into short-month + year", () => {
    // /^[A-Z][a-z]{2} \d{4}$/ reads: start, one uppercase, exactly 2 lowercase, space, 4 digits, end
    const result = formatDate("2024-11-15T10:30:00Z");
    expect(result).toMatch(/^[A-Z][a-z]{2} \d{4}$/);
  });

  it('returns "Unknown" for null input', () => {
    expect(formatDate(null)).toBe("Unknown");
  });

  it('returns "Invalid date" for a non-date string', () => {
    expect(formatDate("not-a-date")).toBe("Invalid date");
  });
});

// calculateReadTime
describe("calculateReadTime", () => {
  it('returns "1 min read" for a short text', () => {
    expect(calculateReadTime("Hello world")).toBe("1 min read");
  });

  it("calculates read time for 400 words correctly", () => {
    const text = "word ".repeat(400).trim();
    expect(calculateReadTime(text)).toBe("2 min read");
  });

  it('returns "0 min read" for null input', () => {
    expect(calculateReadTime(null)).toBe("0 min read");
  });
});

// transformRepo

describe("transformRepo", () => {
  it("transforms a repo object correctly", () => {
    const input = {
      name: "portfolio",
      description: "My portfolio site",
      language: "Javascript",
      stargazers_count: 3,
      html_url: "https://github.com/user/portfolio",
    };
    expect(transformRepo(input)).toEqual({
      name: "portfolio",
      description: "My portfolio site",
      language: "Javascript",
      stars: 3,
      url: "https://github.com/user/portfolio",
    });
  });

  it("uses fallback values for null description and language", () => {
    const input = {
      name: "test-repo",
      description: null,
      language: null,
      stargazers_count: 0,
      html_url: "https://github.com/users/test-repo",
    };
    const result = transformRepo(input);
    expect(result.description).toBe("No description provided.");
    expect(result.language).toBe("Unknown");
  });
});

// validateEmail

describe("validateEmail", () => {
  it("returns true for a standard valid email", () => {
    expect(validateEmail("user@example.com")).toBe(true);
  });

  it("returns true for a subdomain email", () => {
    expect(validateEmail("user@email.example.co.uk")).toBe(true);
  });

  it("returns false when @ is missing", () => {
    expect(validateEmail("notanemail.com")).toBe(false);
  });

  it("returns false when the domain has no dot", () => {
    expect(validateEmail("user@nodot")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(validateEmail("")).toBe(false);
  });

  it("returns false for null input", () => {
    expect(validateEmail(null)).toBe(false);
  });
});

describe("posts", () => {
  it("posts have at least one post", () => {
    expect(posts.length >= 1).toBe(true);
  });

  it("every post has a non-empty title", () => {
    posts.forEach((post) => {
      expect(post.title.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("every post has a non-empty date", () => {
    posts.forEach((post) => {
      expect(post.date.length).toBeGreaterThanOrEqual(1);
    });
  });
});
