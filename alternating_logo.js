   // Logo animation logic
   const logoContainer = document.getElementById('logo-container');
   const numberOfLogos = 5;
   let currentLogo = 1;

   // Create logo elements
   for (let i = 1; i <= numberOfLogos; i++) {
     const logo = document.createElement('img');
     logo.src = `/logo/logo${i}.png`;
     logo.alt = `Logo ${i}`;
     logo.className = `logo ${i === 1 ? 'active' : ''}`;
     logoContainer.appendChild(logo);
   }

   function rotateLogo() {
     const logos = document.querySelectorAll('.logo');
     logos.forEach(logo => logo.classList.remove('active'));
     
     currentLogo = (currentLogo % numberOfLogos) + 1;
     const nextLogo = document.querySelector(`.logo:nth-child(${currentLogo})`);
     nextLogo.classList.add('active');
   }

   // Start the automatic rotation
   setInterval(rotateLogo, 1000);

   fetch('/menu.html')
   .then(response => response.text())
   .then(html => document.getElementById('menu-placeholder').innerHTML = html);
  