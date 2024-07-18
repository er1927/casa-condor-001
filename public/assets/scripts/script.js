// Toggle navigation menu on mobile view
const hamburgerIcon = document.querySelector('.hamburger-icon');
const navMenu = document.querySelector('.header__nav');

hamburgerIcon.addEventListener('click', () => {
    navMenu.classList.toggle('show-nav'); 
});

// Display navigation menu when hamburger icon is clicked on mobile view
document.querySelector('.hamburger-icon').addEventListener('click', displayNav);

function displayNav() {
console.log("hey")
}