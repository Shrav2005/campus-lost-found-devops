const items = [
  { name: 'Silver Laptop', category: 'Electronics', status: 'lost', location: 'Engineering Block', date: '2025-02-12', description: 'Silver laptop with a small blue sticker near the trackpad.' },
  { name: 'Student ID Card', category: 'Cards & IDs', status: 'found', location: 'Central Library', date: '2025-02-14', description: 'Student ID card found near the main entrance.' },
  { name: 'Blue Water Bottle', category: 'Personal items', status: 'lost', location: 'Sports Complex', date: '2025-02-15', description: 'Navy blue bottle with a white campus logo.' },
  { name: 'Scientific Calculator', category: 'Books & stationery', status: 'found', location: 'Room B204', date: '2025-02-16', description: 'Black calculator with initials written on the back.' },
  { name: 'Wireless Earphones', category: 'Electronics', status: 'lost', location: 'Student Cafe', date: '2025-02-17', description: 'White earphones in a compact charging case.' },
  { name: 'Canvas Backpack', category: 'Personal items', status: 'found', location: 'North Gate', date: '2025-02-18', description: 'Green canvas backpack containing a blue notebook.' }
];

const icons = { Electronics: '&#9673;', 'Cards & IDs': '&#10022;', 'Personal items': '&#9675;', 'Books & stationery': '&#9998;', Clothing: '&#9733;', Other: '&#9670;' };
let currentFilter = 'all';

const itemsGrid = document.querySelector('#items-grid');
const emptyState = document.querySelector('#empty-state');
const searchInput = document.querySelector('#search-input');

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function renderItems() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const visibleItems = items.filter((item) => {
    const matchesStatus = currentFilter === 'all' || item.status === currentFilter;
    const matchesSearch = `${item.name} ${item.category}`.toLowerCase().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  itemsGrid.replaceChildren();
  visibleItems.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'item-card';
    const top = document.createElement('div');
    top.className = 'item-top';
    const icon = document.createElement('div');
    icon.className = 'item-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = icons[item.category] || icons.Other;
    const status = document.createElement('span');
    status.className = `item-status ${item.status}`;
    status.textContent = item.status;
    top.append(icon, status);

    const name = document.createElement('h3');
    name.textContent = item.name;
    const category = document.createElement('p');
    category.className = 'item-category';
    category.textContent = item.category;
    const detail = document.createElement('div');
    detail.className = 'item-detail';
    const location = document.createElement('span');
    location.textContent = item.location;
    const date = document.createElement('span');
    date.textContent = formatDate(item.date);
    detail.append(location, date);
    const description = document.createElement('p');
    description.className = 'item-description';
    description.textContent = item.description;
    card.append(top, name, category, detail, description);
    itemsGrid.appendChild(card);
  });
  emptyState.hidden = visibleItems.length > 0;
}

function updateStats() {
  document.querySelector('#lost-count').textContent = items.filter((item) => item.status === 'lost').length;
  document.querySelector('#found-count').textContent = items.filter((item) => item.status === 'found').length;
  document.querySelector('#returned-count').textContent = items.filter((item) => item.returned).length;
}

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((filterButton) => filterButton.classList.toggle('active', filterButton === button));
    renderItems();
  });
});

searchInput.addEventListener('input', renderItems);
document.querySelectorAll('[data-filter-link]').forEach((link) => {
  link.addEventListener('click', () => {
    currentFilter = link.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((button) => button.classList.toggle('active', button.dataset.filter === currentFilter));
    renderItems();
  });
});

document.querySelector('#report-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const newItem = {
    name: form.get('itemName').trim(),
    category: form.get('category'),
    status: form.get('status'),
    location: form.get('location').trim(),
    date: form.get('date'),
    description: form.get('description').trim(),
    returned: false
  };
  items.unshift(newItem);
  event.currentTarget.reset();
  currentFilter = 'all';
  searchInput.value = '';
  document.querySelectorAll('[data-filter]').forEach((button) => button.classList.toggle('active', button.dataset.filter === 'all'));
  updateStats();
  renderItems();
  const successMessage = document.querySelector('#success-message');
  successMessage.hidden = false;
  window.setTimeout(() => { successMessage.hidden = true; }, 5000);
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

updateStats();
renderItems();
