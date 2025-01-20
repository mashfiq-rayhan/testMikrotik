// Check if user is logged in
const userEmail = localStorage.getItem("userEmail");
if (!userEmail) {
  window.location.href = "/"; // Redirect to login if no email found
}

// Display user email
document.getElementById("userEmail").textContent = `Logged in as: ${userEmail}`;

// Dummy package data
const packages = [
  {
    title: "Starter Pack",
    description: "Perfect for basic internet needs with unlimited daily usage",
    limit: "unlimited",
    identifier: "starter-001",
    volume: "Unlimited",
    price: "5",
    duration: "1 day",
  },
  {
    title: "Pro Package",
    description: "High-speed connection with premium support",
    limit: "1000 Mbps",
    identifier: "pro-002",
    volume: "Unlimited",
    price: "15",
    duration: "7 days",
  },
  {
    title: "Family Bundle",
    description: "Ideal for households with multiple devices",
    limit: "2000 Mbps",
    identifier: "family-003",
    volume: "Unlimited",
    price: "40",
    duration: "30 days",
  },
  {
    title: "Business Elite",
    description: "Enterprise-grade connectivity solution",
    limit: "5000 Mbps",
    identifier: "business-004",
    volume: "Unlimited",
    price: "100",
    duration: "30 days",
  },
];

// Function to display packages
function displayPackages() {
  const container = document.getElementById("packagesContainer");
  container.innerHTML = ""; // Clear container

  packages.forEach((pkg) => {
    const card = createPackageCard(pkg);
    container.appendChild(card);
  });
}

// Function to create a package card
function createPackageCard(pkg) {
  const card = document.createElement("div");
  card.className = "package-card";

  card.innerHTML = `
        <div class="package-header">
            <h2 class="package-title">${pkg.title}</h2>
            <div class="package-price">${pkg.price}<span class='package-price-sub-title'> tk</span></div>
        </div>
        <p class="package-description">${pkg.description}</p>
        <div class="package-features">
            <div class="feature">
                <span class="feature-label">Speed</span>
                <span class="feature-value">${pkg.limit}</span>
            </div>
            <div class="feature">
                <span class="feature-label">Duration</span>
                <span class="feature-value">${pkg.duration}</span>
            </div>
            <div class="feature">
                <span class="feature-label">Volume</span>
                <span class="feature-value">${pkg.volume}</span>
            </div>
        </div>
        <button 
            class="select-button" 
            onclick="selectPackage('${pkg.identifier}')"
        >
            Select Plan
        </button>
    `;

  return card;
}

// Function to handle package selection
function selectPackage(identifier) {
  localStorage.setItem("selectedPackage", identifier);
  alert(`Selected package: ${identifier}`);
}

// Load packages when page loads
displayPackages();
