import { handleCountrySelection, initializeMapAndSetHandlers } from './map.js';
import { showLoader, openModal } from './utils.js';

let allCountries = []; // Cached country data

$(document).ready(() => {
    showLoader();
    initializeMapWithUserLocation();
    fetchAndCacheCountryData();

    // Attach search bar handlers
    $('#country-search-bar').on('input', debounce(handleCountrySearch, 300)); // Add debounce for smoother experience
    $('#country-search-bar').on('focus', displayInitialSearchResults); // Show initial results on focus

    // Clear search results when clicking outside
    $(document).on('click', handleDocumentClick);

    // Modal toggle
    $('#toggle-modal-btn').on('click', openModal);

    // Modal close button
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
            isCountryDataReady = true; // Avoid infinite loader
            checkLoaderStatus();
        });
}

// Handle country search input
function handleCountrySearch() {
    const searchTerm = $('#country-search-bar').val().toLowerCase();
    const results = allCountries.filter(country =>
        country.name.toLowerCase().startsWith(searchTerm)
    );
    displaySearchResults(results);
}

// Show initial results on search bar focus
function displayInitialSearchResults() {
    const initialResults = allCountries.slice(0, 3); // Show first 3 countries alphabetically
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

// Clear search results when clicking outside
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
            () => initializeMapAndSetHandlers(51.505, -0.09) // Default to London
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