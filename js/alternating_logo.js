// Logo animation logic
const logoContainer = document.getElementById('logo-container');
const numberOfLogos = 3; // Only use the first 3 logos
let currentLogo = 1;
let rotationInterval = null;

// Create wrapper for logos to maintain consistent positioning
const logoWrapper = document.createElement('div');
logoWrapper.className = 'logo-wrapper';
logoContainer.appendChild(logoWrapper);

// Create logo elements with consistent sizing
for (let i = 1; i <= numberOfLogos; i++) {
  const logo = document.createElement('img');
  logo.src = `/assets/logo/logo${i}.png`;
  logo.alt = `Logo ${i}`;
  logo.className = `logo ${i === 1 ? 'active' : ''}`;
  logoWrapper.appendChild(logo);
}

// Function to rotate logos
function rotateLogo() {
  const logos = document.querySelectorAll('.logo');
  logos.forEach(logo => logo.classList.remove('active'));
  
  currentLogo = (currentLogo % numberOfLogos) + 1;
  const nextLogo = document.querySelector(`.logo:nth-child(${currentLogo})`);
  nextLogo.classList.add('active');
}

// Start rotation only on hover
logoContainer.addEventListener('mouseenter', () => {
  // Clear any existing interval to prevent multiple intervals
  if (rotationInterval) clearInterval(rotationInterval);
  // Start a new rotation interval
  rotationInterval = setInterval(rotateLogo, 800);
});

// Stop rotation when mouse leaves
logoContainer.addEventListener('mouseleave', () => {
  if (rotationInterval) {
    clearInterval(rotationInterval);
    rotationInterval = null;
  }
});

// Load menu content
fetch('/components/menu.html')
.then(response => response.text())
.then(html => document.getElementById('menu-placeholder').innerHTML = html);