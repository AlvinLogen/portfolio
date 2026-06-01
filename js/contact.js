// contact.js - form validation

const form = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]$/;

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      showFeedback("Please fill in all fields.", "error");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      showFeedback("Please enter a valid email address.", "error");
      return;
    }

    showFeedback(`Thanks ${name}! Your message has been received.`, "success");
    form.reset();
  });
}

function showFeedback(message, type) {
  feedback.textContent = message;
  feedback.style.color = type === "error" ? "#ef4444" : "#22c55e";
}
