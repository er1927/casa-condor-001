document.addEventListener('DOMContentLoaded', () => {
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const navMenu = document.querySelector('.header__nav');
  const toggleButton = document.getElementById('toggle-theme');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  const themeImage = document.getElementById('theme-image');
  const header = document.querySelector('.header');
  const searchIcon = document.getElementById('search-icon');
  const searchBar = document.getElementById('search-bar');
  const searchButton = document.getElementById('search-button');
  const footerNav = document.querySelector('.footer__nav');
  const allIcons = footerNav.querySelectorAll('button, i'); // Selects all buttons and icons within .footer__nav

  const blogCardsContainer = document.getElementById('blog-cards');
  const blogEntrySection = document.getElementById('blog-entry');
  const backButton = document.getElementById('back-button');

  const entryTitle = document.getElementById('entry-title');
  const entrySubtitle = document.getElementById('entry-subtitle');
  const entryImage = document.getElementById('entry-image');
  const entryContent = document.getElementById('entry-content');
  const entryTags = document.getElementById('entry-tags');
  const entryAuthor = document.getElementById('entry-author');

  let blogEntries = [];

  function updateTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeImage.src = isDark ? './assets/images/DM_logo-img.png' : './assets/images/LM_logo-img.png';
    sunIcon.style.display = isDark ? 'inline' : 'none';
    moonIcon.style.display = isDark ? 'none' : 'inline';
  }

  hamburgerIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    navMenu.classList.toggle('show-nav');
  });

  document.addEventListener('click', () => navMenu.classList.remove('show-nav'));
  document.addEventListener('scroll', () => navMenu.classList.remove('show-nav'));

  navMenu.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    updateTheme();
  });

  updateTheme();

  fetch('./assets/scripts/blog-entries.json')
    .then(response => response.json())
    .then(entries => {
      blogEntries = entries;
      displayBlogCards(entries);
    });

  function displayBlogCards(entries) {
    blogCardsContainer.innerHTML = '';
    entries.forEach(entry => {
      const card = createBlogCard(entry);
      blogCardsContainer.appendChild(card);
    });
  }

  function createBlogCard(entry) {
    const card = document.createElement('div');
    card.classList.add('blog__card');
    card.addEventListener('click', () => displayEntry(entry));

    const cardImage = document.createElement('img');
    card.classList.add('blog__card__image');
    cardImage.src = entry.image;
    cardImage.alt = '';

    const cardTitle = document.createElement('h2');
    card.classList.add('blog__card__title');
    cardTitle.textContent = entry.title;

    const cardSubtitle = document.createElement('h3');
    card.classList.add('blog__card__subtitle');
    cardSubtitle.textContent = entry.subtitle;

    card.appendChild(cardImage);
    card.appendChild(cardTitle);
    card.appendChild(cardSubtitle);

    return card;
  }

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

  window.addEventListener('scroll', () => {
    header.classList.toggle('small', window.scrollY > 50);
  });

  function searchBlogs(query) {
    const results = blogEntries.filter(entry =>
      entry.title.toLowerCase().includes(query.toLowerCase()) ||
      entry.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      entry.content.toLowerCase().includes(query.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      entry.author.toLowerCase().includes(query.toLowerCase())
    );

    displayBlogCards(results.length ? results : [{ title: 'No results found.', subtitle: '', image: '', content: '', tags: [], author: '' }]);
  }

  function toggleSearchBar() {
    const isVisible = searchBar.style.display === 'inline';
    searchBar.style.display = isVisible ? 'none' : 'inline';
    searchButton.style.display = isVisible ? 'none' : 'inline';
    searchIcon.style.display = isVisible ? 'inline' : 'none';

    // Show or hide all icons
    allIcons.forEach(icon => {
      icon.classList.toggle('hidden', !isVisible);
    });

    if (isVisible) {
      document.removeEventListener('click', handleClickOutside);
    } else {
      document.addEventListener('click', handleClickOutside);
    }
  }

  searchIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleSearchBar();
  });

  searchBar.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  searchButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if (searchBar.value) {
      searchBlogs(searchBar.value);
    }
  });

  // Function to handle clicks outside of the search bar
  function handleClickOutside(event) {
    if (!searchIcon.contains(event.target) &&
        !searchBar.contains(event.target) &&
        !searchButton.contains(event.target)) {
      // Hide search elements and show the search icon
      searchBar.style.display = 'none';
      searchButton.style.display = 'none';
      searchIcon.style.display = 'inline';

      // Show all icons
      allIcons.forEach(icon => icon.classList.remove('hidden'));
    }
  }

  // Initial event listener setup
  document.addEventListener('click', handleClickOutside);
});
