document.addEventListener('DOMContentLoaded', () => {
  console.log('test'); // Debugging line
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const navMenu = document.querySelector('.header__nav');
  const toggleButton = document.getElementById('toggle-theme');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  const themeImage = document.getElementById('theme-image');

  // Function to update image and icons based on theme
  function updateTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeImage.src = isDark ? '/public/assets/images/DM_logo-img.png' : '/public/assets/images/LM_logo-img.png';
    sunIcon.style.display = isDark ? 'inline' : 'none';
    moonIcon.style.display = isDark ? 'none' : 'inline';
    console.log('Theme image updated:', themeImage.src); // Debugging line
  }

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

  toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    updateTheme();
  });

  // Initialize the correct icon and image based on the initial theme
  updateTheme();
});
