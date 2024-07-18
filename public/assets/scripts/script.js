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
