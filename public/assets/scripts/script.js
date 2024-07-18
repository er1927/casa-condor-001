// Toggle navigation menu on mobile view
const hamburgerIcon = document.querySelector('.hamburger-icon');
const navMenu = document.querySelector('.header__nav');

hamburgerIcon.addEventListener('click', () => {
    navMenu.classList.toggle('show-nav'); 
});

// Display navigation menu when hamburger icon is clicked on mobile view
document.querySelector('.hamburger-icon').addEventListener('click', displayNav);

function displayNav(event) {
  // Prevent the click event from propagating to the document
  event.stopPropagation();

  // Check if the navigation already exists
  let navColumn = document.querySelector('.nav-column');

  if (!navColumn) {
    // Create the navigation container
    navColumn = document.createElement('div');
    navColumn.classList.add('nav-column');

    // Style the navigation container
    navColumn.style.display = 'flex';
    navColumn.style.flexDirection = 'column';
    navColumn.style.backgroundColor = 'gray';
    navColumn.style.color = 'white';
    navColumn.style.padding = '10px';
    navColumn.style.position = 'absolute';
    navColumn.style.top = '0';
    navColumn.style.right = '0';
    navColumn.style.width = '150px';

    // Create navigation items
    const items = ['Blog', 'About', 'Contact'];

    items.forEach(item => {
      const div = document.createElement('div');
      div.textContent = item;

      // Style each navigation item
      div.style.margin = '10px 0';

      navColumn.appendChild(div);
    });

    // Append the navigation container to the body
    document.body.appendChild(navColumn);

    // Add event listeners to hide the nav on click or scroll
    document.addEventListener('click', hideNav);
    document.addEventListener('scroll', hideNav);
  }

  // Toggle the display of the navigation column
  navColumn.style.display = navColumn.style.display === 'none' ? 'flex' : 'none';
}

function hideNav() {
  const navColumn = document.querySelector('.nav-column');
  if (navColumn) {
    navColumn.style.display = 'none';
  }
}

// Prevent the nav from hiding when clicking inside it
document.body.addEventListener('click', (event) => {
  const navColumn = document.querySelector('.nav-column');
  if (navColumn && navColumn.contains(event.target)) {
    event.stopPropagation();
  }
});
