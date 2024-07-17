// Toggle navigation menu on mobile view
const hamburgerIcon = document.querySelector('.hamburger-icon');
const navMenu = document.querySelector('.header__nav');

hamburgerIcon.addEventListener('click', () => {
    navMenu.classList.toggle('show-nav'); 
});
