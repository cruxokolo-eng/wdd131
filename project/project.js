const destinations = [
    {
        id: 'zuma-rock',
        name: 'Zuma Rock',
        region: 'Niger State · near Abuja',
        category: 'Landmark',
        description: 'A dramatic monolith on the road north from Abuja. Pair the view with time in the capital region.',
        image: 'images/zuma-rock.jpg',
        imageAlt: 'Zuma Rock rising above the landscape near Abuja',
        width: 1024,
        height: 539,
        credit: 'Jeff Attaway · CC BY 2.0',
        source: 'https://commons.wikimedia.org/wiki/File:Zuma_Rock.jpg'
    },
    {
        id: 'lagos',
        name: 'Lagos',
        region: 'Southwest Nigeria',
        category: 'City life',
        description: 'A fast-moving coastal metropolis known for its creative energy, food, music, and layered history.',
        image: 'images/lagos-1962.jpg',
        imageAlt: 'Historic Lagos roundabout with a fountain and buildings, photographed in 1962',
        width: 1280,
        height: 849,
        credit: 'Maarten van Dis / NSAG · CC BY-SA 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:ASC_Leiden_-_NSAG_-_van_Dis_5_-_024_-_A_city_roundabout_with_a_modernistic_fountain_and_a_huge_pool_-_Lagos,_Nigeria_-_February_14,_1962.tiff'
    },
    {
        id: 'yankari',
        name: 'Yankari Game Reserve',
        region: 'Bauchi State · Northeast',
        category: 'Nature',
        description: 'A large protected area with savanna, woodland, wildlife, and the warm waters of Wikki Warm Spring.',
        image: 'images/yankari.jpg',
        imageAlt: 'Landscape in Yankari Game Reserve in northeastern Nigeria',
        width: 400,
        height: 300,
        credit: 'Peter Garland · Public domain',
        source: 'https://commons.wikimedia.org/wiki/File:Yankari.jpg'
    },
    {
        id: 'osun-grove',
        name: 'Osun-Osogbo Sacred Grove',
        region: 'Osun State · Southwest',
        category: 'Living heritage',
        description: 'A sacred forest along the Osun River, cared for by the community and recognized by UNESCO.',
        image: 'images/osun-grove.jpg',
        imageAlt: 'Forest landscape at the Osun-Osogbo Sacred Grove',
        width: 539,
        height: 404,
        credit: 'Cheeka 2.0 · CC BY-SA 4.0',
        source: 'https://commons.wikimedia.org/wiki/File:Osun-Osogbo_Sacred_Grove,_Osun_State.jpg'
    }
];

const favoritesKey = 'naija-atlas-saved-places';
let savedPlaceIds = [];

function loadSavedPlaces() {
    const storedValue = localStorage.getItem(favoritesKey);

    if (storedValue === null) {
        return [];
    }

    const parsedValue = JSON.parse(storedValue);
    const isValidList = Array.isArray(parsedValue)
        && parsedValue.every((placeId) => typeof placeId === 'string')
        && parsedValue.every((placeId) => destinations.some((place) => place.id === placeId));

    if (!isValidList) {
        throw new Error('The saved places list has an unexpected format. Clear this site data to start a new list.');
    }

    return [...new Set(parsedValue)];
}

function createDestinationCard(place) {
    const isSaved = savedPlaceIds.includes(place.id);
    const buttonLabel = isSaved ? `Remove saved place` : `Save place`;

    return `
        <article class="destination-card">
            <a class="destination-image-link" href="${place.source}" target="_blank" rel="noreferrer"
                aria-label="View the photo source for ${place.name}">
                <img src="${place.image}" alt="${place.imageAlt}" width="${place.width}" height="${place.height}"
                    loading="lazy" decoding="async">
            </a>
            <div class="destination-card-body">
                <p class="destination-category">${place.category}</p>
                <h3>${place.name}</h3>
                <p class="destination-region">${place.region}</p>
                <p>${place.description}</p>
                <div class="destination-card-actions">
                    <button class="save-button" type="button" data-save-place="${place.id}"
                        aria-pressed="${isSaved}">${buttonLabel}</button>
                    <a class="photo-credit" href="${place.source}" target="_blank" rel="noreferrer">${place.credit}</a>
                </div>
            </div>
        </article>
    `;
}

function renderDestinations() {
    const homeContainer = document.querySelector('#home-destinations');
    const placesContainer = document.querySelector('#all-destinations');

    if (homeContainer) {
        homeContainer.innerHTML = destinations.slice(0, 3).map(createDestinationCard).join(``);
    }

    if (placesContainer) {
        placesContainer.innerHTML = destinations.map(createDestinationCard).join(``);
    }
}

function renderSavedPlaces() {
    const savedContainer = document.querySelector('#saved-places');

    if (!savedContainer) {
        return;
    }

    const savedPlaces = destinations.filter((place) => savedPlaceIds.includes(place.id));

    if (savedPlaces.length === 0) {
        savedContainer.innerHTML = `
            <p class="empty-state">No saved places yet. Choose “Save place” on a destination card to start your list.</p>
        `;
        return;
    }

    savedContainer.innerHTML = `
        <ul class="saved-items">
            ${savedPlaces.map((place) => `
                <li>
                    <span><strong>${place.name}</strong><small>${place.region}</small></span>
                    <button class="remove-button" type="button" data-save-place="${place.id}"
                        aria-label="Remove ${place.name} from saved places">Remove</button>
                </li>
            `).join(``)}
        </ul>
    `;
}

function setStorageMessage(message) {
    document.querySelectorAll('#storage-status').forEach((status) => {
        status.textContent = `${message}`;
    });
}

function handleFavoriteClick(event) {
    const button = event.target.closest('[data-save-place]');

    if (!button) {
        return;
    }

    const placeId = button.dataset.savePlace;
    const isAlreadySaved = savedPlaceIds.includes(placeId);
    const nextSavedPlaces = isAlreadySaved
        ? savedPlaceIds.filter((savedId) => savedId !== placeId)
        : [...savedPlaceIds, placeId];

    try {
        localStorage.setItem(favoritesKey, JSON.stringify(nextSavedPlaces));
        savedPlaceIds = nextSavedPlaces;
        renderDestinations();
        renderSavedPlaces();
        setStorageMessage(isAlreadySaved ? 'Place removed from your saved list.' : 'Place added to your saved list.');
    } catch (error) {
        console.error('Unable to save this place in local storage.', error);
        setStorageMessage('Your browser could not save this place. Check its storage settings and try again.');
    }
}

function handleInterestForm(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const interests = formData.getAll('interests');
    const timeFrame = formData.get('travelWindow');
    const status = document.querySelector('#form-status');

    if (interests.length === 0) {
        status.textContent = `Choose at least one interest so we can shape a trip idea.`;
        form.querySelector('input[name="interests"]').focus();
        return;
    }

    const interestLabels = interests.map((interest) => ({
        nature: 'nature and landscapes',
        cities: 'cities and food',
        heritage: 'heritage and culture'
    }[interest]));
    const travelLabels = {
        soon: 'the next six months',
        later: 'more than six months from now',
        exploring: 'an early idea search'
    };

    status.textContent = `${name}, your sample trip can focus on ${interestLabels.join(`, `)} for ${travelLabels[timeFrame]}. This demo does not send your details.`;
    form.reset();
}

function initializePage() {
    document.querySelectorAll('[data-current-year]').forEach((year) => {
        year.textContent = `${new Date().getFullYear()}`;
    });

    const hasSaveControls = document.querySelector('#home-destinations, #all-destinations, #saved-places');

    if (hasSaveControls) {
        try {
            savedPlaceIds = loadSavedPlaces();
            renderDestinations();
            renderSavedPlaces();
            document.addEventListener('click', handleFavoriteClick);
        } catch (error) {
            console.error('Unable to load saved places.', error);
            renderDestinations();
            renderSavedPlaces();
            setStorageMessage('Your saved list could not be loaded. Clear this site data to start a new list.');
        }
    }

    const interestForm = document.querySelector('#interest-form');

    if (interestForm) {
        interestForm.addEventListener('submit', handleInterestForm);
    }
}

initializePage();
