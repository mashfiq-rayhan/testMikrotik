// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  // Get the email input value
  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim();

  // Validate email
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address");
    return false;
  }

  // Save email to localStorage
  localStorage.setItem("userEmail", email);

  // Redirect to packages page
  window.location.href = "/custom-captive-portal/packages.html";

  return false;
}

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to get email from localStorage (can be used on other pages)
function getStoredEmail() {
  return localStorage.getItem("userEmail");
}

// Function to clear stored email (useful for logout)
function clearStoredEmail() {
  localStorage.removeItem("userEmail");
}
