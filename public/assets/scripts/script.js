document.addEventListener('DOMContentLoaded', () => {
  // Debugging line
  // console.log('test'); 

  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const navMenu = document.querySelector('.header__nav');
  const toggleButton = document.getElementById('toggle-theme');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  const themeImage = document.getElementById('theme-image');

  const blogCardsContainer = document.getElementById('blog-cards');
  const blogEntrySection = document.getElementById('blog-entry');
  const backButton = document.getElementById('back-button');

  const entryTitle = document.getElementById('entry-title');
  const entrySubtitle = document.getElementById('entry-subtitle');
  const entryImage = document.getElementById('entry-image');
  const entryContent = document.getElementById('entry-content');
  const entryTags = document.getElementById('entry-tags');
  const entryAuthor = document.getElementById('entry-author');

  // Function to update image and icons based on theme
  function updateTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeImage.src = isDark ? '/public/assets/images/DM_logo-img.png' : '/public/assets/images/LM_logo-img.png';
    sunIcon.style.display = isDark ? 'inline' : 'none';
    moonIcon.style.display = isDark ? 'none' : 'inline';
    // Debugging line
    // console.log('Theme image updated:', themeImage.src);
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

  fetch('/public/assets/scripts/blog-entries.json')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        const card = document.createElement('div');
        card.classList.add('blog__card');
        card.addEventListener('click', () => displayEntry(entry));

        const cardImage = document.createElement('img');
        cardImage.classList.add('blog__card__image');
        cardImage.src = entry.image;
        cardImage.alt = 'Blog Image';

        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('blog__card__title');
        cardTitle.textContent = entry.title;

        const cardSubtitle = document.createElement('h3');
        cardSubtitle.classList.add('blog__card__subtitle');
        cardSubtitle.textContent = entry.subtitle;

        card.appendChild(cardImage);
        card.appendChild(cardTitle);
        card.appendChild(cardSubtitle);

        blogCardsContainer.appendChild(card);
      });
    });

  function displayEntry(entry) {
    blogCardsContainer.style.display = 'none';
    blogEntrySection.style.display = 'block';

    entryTitle.textContent = entry.title;
    entrySubtitle.textContent = entry.subtitle;
    entryImage.src = entry.image;
    entryContent.textContent = entry.content;
    entryTags.textContent = `Tags: ${entry.tags.join(', ')}`;
    entryAuthor.textContent = `Author: ${entry.author}`;
  }

  backButton.addEventListener('click', () => {
    blogEntrySection.style.display = 'none';
    blogCardsContainer.style.display = 'flex';
  });
});
