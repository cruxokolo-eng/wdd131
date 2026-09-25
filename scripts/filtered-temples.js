const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
    },
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253000,
        imageUrl:
            "https://images.unsplash.com/photo-1604510591161-9171a96197e6?auto=format&fit=crop&w=900&q=80",
    },
    {
        templeName: "Tokyo Japan",
        location: "Tokyo, Japan",
        dedicated: "1980, October, 27",
        area: 15591,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x250/tokyo-japan-temple-lds-213874-wallpaper.jpg",
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 18523,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-lds-600619-wallpaper.jpg",
    },
    {
        templeName: "Bern Switzerland",
        location: "Bern, Switzerland",
        dedicated: "1955, September, 11",
        area: 19840,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/bern-switzerland/400x250/bern-switzerland-temple-lds-773792-wallpaper.jpg",
    },
];

const gallery = document.getElementById('gallery');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const filterLinks = document.querySelectorAll('[data-filter]');

function getTempleYear(temple) {
    return Number(temple.dedicated.split(',')[0]);
}

function renderTemples(filteredTemples) {
    if (!gallery) return;

    gallery.innerHTML = '';

    filteredTemples.forEach((temple) => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figcaption = document.createElement('figcaption');
        const title = document.createElement('h3');
        const details = document.createElement('div');

        img.src = temple.imageUrl;
        img.alt = `${temple.templeName} temple`;
        img.loading = 'lazy';

        title.textContent = temple.templeName;

        details.className = 'details';
        details.innerHTML = `
      <div><strong>Location:</strong> ${temple.location}</div>
      <div><strong>Dedicated:</strong> ${temple.dedicated}</div>
      <div><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</div>
    `;

        figcaption.appendChild(title);
        figcaption.appendChild(details);
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

function filterTemples(type) {
    switch (type) {
        case 'old':
            return temples.filter((temple) => getTempleYear(temple) < 1900);
        case 'new':
            return temples.filter((temple) => getTempleYear(temple) > 2000);
        case 'large':
            return temples.filter((temple) => temple.area > 90000);
        case 'small':
            return temples.filter((temple) => temple.area < 10000);
        case 'all':
        default:
            return temples;
    }
}

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.textContent = isOpen ? '✕' : '☰';
    });
}

filterLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const selectedFilter = link.dataset.filter || 'all';
        renderTemples(filterTemples(selectedFilter));

        if (navLinks) {
            navLinks.classList.remove('open');
        }

        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.textContent = '☰';
        }
    });
});

const currentYear = document.getElementById('currentyear');
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const lastModified = document.getElementById('lastModified');
if (lastModified) {
    lastModified.textContent = `Last modified: ${document.lastModified}`;
}

renderTemples(temples);
