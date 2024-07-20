document.addEventListener('DOMContentLoaded', () => {
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const navMenu = document.querySelector('.header__nav');

  hamburgerIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    navMenu.classList.toggle('show-nav');
  });

  document.addEventListener('click', hideNav);
  document.addEventListener('scroll', hideNav);

  function hideNav() {
    navMenu.classList.remove('show-nav');
  }

  // Prevent the nav from hiding when clicking inside it
  navMenu.addEventListener('click', (event) => {
    event.stopPropagation();
  });
});


const toggleButton = document.getElementById('toggle-theme');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

toggleButton.addEventListener('click', () => {
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
    }
});

// Initialize the correct icon based on the initial theme
if (document.documentElement.getAttribute('data-theme') === 'dark') {
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
} else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
}
