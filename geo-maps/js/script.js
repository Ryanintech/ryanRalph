import { handleCountrySelection, initializeMapAndSetHandlers } from './map.js';
import { showLoader, openModal } from './utils.js';

let allCountries = [];

$(document).ready(() => {
    showLoader();
    initializeMapWithUserLocation();
    fetchAndCacheCountryData();

    $('#country-search-bar').on('input', debounce(handleCountrySearch, 300));
    $('#country-search-bar').on('focus', displayInitialSearchResults);
    $(document).on('click', handleDocumentClick);

    $('#toggle-modal-btn').on('click', openModal);

    $(document).on('click', '.modal-close-btn', () => {
        $('#country-modal').hide();
    });

    // Search bar focus and blur effects
    const searchBar = $('#country-search-bar');
    const searchIcon = $('.search-icon');
    searchBar.on('focus', () => searchIcon.css('opacity', '0'));
    searchBar.on('blur', () => {
        if (searchBar.val() === '') searchIcon.css('opacity', '1');
    });
});

// Fetch country data and cache it
function fetchAndCacheCountryData() {
    fetch('countryBorders.geo.json')
        .then(response => response.json())
        .then(data => {
            allCountries = data.features.map(feature => ({
                name: feature.properties.name,
                isoCode: feature.properties.iso_a2,
                geometry: feature.geometry,
            }));

            allCountries.sort((a, b) => a.name.localeCompare(b.name));
            isCountryDataReady = true;
            checkLoaderStatus();
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
            isCountryDataReady = true;
            checkLoaderStatus();
        });
}

// Handle country search input
function handleCountrySearch() {
    const searchTerm = $('#country-search-bar').val().toLowerCase();

    const results = allCountries.filter(country => {
        const countryName = country.name.toLowerCase();

        if (countryName.startsWith(searchTerm)) {
            return true;
        }

        return countryName.includes(searchTerm);
    });

    const exactMatches = results.filter(country => country.name.toLowerCase().startsWith(searchTerm));
    const partialMatches = results.filter(country => !country.name.toLowerCase().startsWith(searchTerm));

    const sortedResults = [...exactMatches, ...partialMatches];

    displaySearchResults(sortedResults);
}


// Show initial results on search bar focus
function displayInitialSearchResults() {
    const initialResults = allCountries.slice(0, 3);
    displaySearchResults(initialResults);
}

// Display search results dynamically
function displaySearchResults(results) {
    const resultsContainer = $('#country-search-results');
    resultsContainer.empty();

    if (results.length > 0) {
        results.forEach(country => {
            const resultItem = $('<div class="search-result-item"></div>')
                .text(country.name)
                .on('click', () => handleCountrySelection(country.isoCode));
            resultsContainer.append(resultItem);
        });
    } else {
        resultsContainer.append('<div class="no-results">No results found</div>');
    }
}

function handleDocumentClick(event) {
    const searchBar = $('#country-search-bar');
    const resultsContainer = $('#country-search-results');
    if (!searchBar.is(event.target) && !resultsContainer.is(event.target) && resultsContainer.has(event.target).length === 0) {
        resultsContainer.empty();
    }
}

// Initialize map with user's location
function initializeMapWithUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                initializeMapAndSetHandlers(latitude, longitude);
            },
            () => initializeMapAndSetHandlers(51.505, -0.09)
        );
    } else {
        alert('Geolocation not supported.');
        initializeMapAndSetHandlers(51.505, -0.09);
    }
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), wait);
    };
}

let isMapReady = false;
let isCountryDataReady = false;


export function checkLoaderStatus() {
    if (isMapReady && isCountryDataReady) {
        hideLoader();
    }
}