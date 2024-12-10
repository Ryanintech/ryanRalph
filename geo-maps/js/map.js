import { getCountryData } from './getCountryData.js';
import { updateTime } from './getTime.js';
import { fetchWeatherAndUpdateUI } from './getWeather.js';
import { checkLoaderStatus } from './script.js';
import { hideLoader, openModal, showLoader } from './utils.js';
let map; // Global variable to store the map instance
let marker; // Global variable to store the marker instance
let isDragging = false; // Declare and initialize isDragging


export function initializeMap(latitude, longitude) {
    if (!L) {
        console.error("Leaflet.js library is not loaded.");
        return;
    }

    if (!map) {
        map = L.map('map', {
            worldCopyJump: true,
            center: [latitude, longitude],
            zoom: 13,
            minZoom: 2, // Set the minimum zoom level (zoom out far enough)
            maxZoom: 18, // Set the maximum zoom level (zoom in as needed)
            preferCanvas: true,
        });

        L.tileLayer('https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=e4870308b9ad45b294ef85213ddb2328', {
            attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>',
            maxZoom: 19,
        }).addTo(map);

        // Create the draggable marker
        marker = L.marker([latitude, longitude], { draggable: true })
            .addTo(map)
            .bindPopup("Drag me or click a country to get info!")
            .openPopup();
        showLoader();

        getCountryData(latitude, longitude).catch(() => hideLoader());

        // Update data on marker move
        marker.on('dragend', () => {
            const { lat, lng } = marker.getLatLng();
            showLoader();
            handleLocationData(lat, lng);  // Handle location data based on new marker position
            updateTime(lat, lng);
            updateMapPosition(lat, lng);

        });

        marker.on('click', () => {
            openModal();
        });

        map.on('click', function (e) {
            const { lat, lng } = e.latlng;

            handleLocationData(lat, lng)  // Use the new function to handle location data
                .catch((error) => {
                    console.error("Error handling location data:", error);
                });

            showLoader();
            updateTime(lat, lng);
            updateMapPosition(lat, lng);  // Update map position with new click location
            updateMarkerPosition(lat, lng); // Update marker position with new click location

            // Zoom in the map when it's clicked
            let newZoom = map.getZoom() + 1;  // Increase zoom level by 1
            if (newZoom > map.getMaxZoom()) {
                newZoom = map.getMaxZoom();  // Limit the zoom to the maximum zoom level
            }

            // Set the new zoom level and center the map at the clicked position
            map.setView([lat, lng], newZoom);
        });



    }

    return map;
}

// Handle country selection from the search results
export function handleCountrySelection(countryCode) {
    showLoader();
    fetch(`php/getCountryData.php?code=${countryCode}`)
        .then(response => response.json())
        .then(data => {
            const { lat, lng } = data.capitalCoordinates;
            if (lat && lng) {
                updateMarkerPosition(lat, lng); // Update the marker on the map
                map.setView([lat, lng], 8); // Center the map on the capital
                fetchWeatherAndUpdateUI(lat, lng, data);
                updateTime(lat, lng); // Update the time based on the new location
            } else {
                console.error('No coordinates available for capital.');
                alert('Could not find coordinates for the selected country.');
                hideLoader(); // Hide loader if no coordinates are found
            }
        })
        .catch(err => {
            console.error('Error fetching country data:', err);
            hideLoader(); // Hide loader if there was an error fetching country data
        });
}


export function initializeMapAndSetHandlers(lat, lng) {
    map = initializeMap(lat, lng);
    updateTime(lat, lng);

    // Disable map dragging and zooming when interacting with other UI elements
    map.on('movestart', () => {
        if (isDragging) map.dragging.disable();
    });

    map.on('moveend', () => {
        const center = map.getCenter();
        updateTime(center.lat, center.lng); // Update time dynamically on marker drag
    });

    map.on('load', () => {
        mapLoaded = true;
        checkLoaderStatus();
    });
}
// Function to update marker position
export function updateMarkerPosition(latitude, longitude) {
    if (marker && map) {
        marker.setLatLng([latitude, longitude]);
        map.setView([latitude, longitude], map.getZoom());
    } else {
        console.error("Marker or map is not initialized.");
    }
}


// Function to update map position after dragging the marker
function updateMapPosition(latitude, longitude) {
    if (map) {
        map.setView([latitude, longitude], map.getZoom());
    }
}

async function handleLocationData(lat, lon) {
    // First, check if country data is available
    getCountryData(lat, lon)
        .then(countryData => {
            if (countryData) {
                // Country data is available, so no need to show ocean modal
                console.log('Country data found:', countryData);
                // Handle country data (e.g., show country details in modal)
            } else {
            }
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
        });
}

