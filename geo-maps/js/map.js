import { getCountryData } from './getCountryData.js';
import { updateTime } from './getTime.js';
import { fetchWeatherAndUpdateUI } from './getWeather.js';
import { checkLoaderStatus } from './script.js';
import { hideLoader, openModal, showLoader } from './utils.js';
let map;
let marker;
let isDragging = false;


export function initializeMap(latitude, longitude) {
    if (!L) {
        console.error("Leaflet.js library is not loaded.");
        return;
    }

    if (!map) {
        map = L.map('map', {
            worldCopyJump: true,
            continuousWorld: true,
            center: [latitude, longitude],
            zoom: 13,
            minZoom: 2,
            maxZoom: 18,
            preferCanvas: true,
        });

        L.tileLayer('https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=e4870308b9ad45b294ef85213ddb2328', {
            attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>',
            maxZoom: 19,
        }).addTo(map);

        // Set the maxBounds to limit the map's movement (avoid the grey area)
        map.setMaxBounds([
            [-90, -180],
            [90, 180]
        ]);


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
            handleLocationData(lat, lng);
            updateTime(lat, lng);
            updateMapPosition(lat, lng);

        });

        marker.on('click', () => {
            openModal();
        });

        map.on('click', function (e) {
            const { lat, lng } = e.latlng;

            handleLocationData(lat, lng)
                .catch((error) => {
                    console.error("Error handling location data:", error);
                });

            showLoader();
            updateTime(lat, lng);
            updateMapPosition(lat, lng);
            updateMarkerPosition(lat, lng);

            let newZoom = map.getZoom() + 1;
            if (newZoom > map.getMaxZoom()) {
                newZoom = map.getMaxZoom();
            }

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
                updateMarkerPosition(lat, lng);
                map.setView([lat, lng], 8);
                fetchWeatherAndUpdateUI(lat, lng, data);
                updateTime(lat, lng);
            } else {
                console.error('No coordinates available for capital.');
                alert('Could not find coordinates for the selected country.');
                hideLoader();
            }
        })
        .catch(err => {
            console.error('Error fetching country data:', err);
            hideLoader();
        });
}


export function initializeMapAndSetHandlers(lat, lng) {
    map = initializeMap(lat, lng);
    updateTime(lat, lng);

    map.on('movestart', () => {
        if (isDragging) map.dragging.disable();
    });

    map.on('moveend', () => {
        const center = map.getCenter();
        updateTime(center.lat, center.lng);
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
    getCountryData(lat, lon)
        .then(countryData => {
            if (countryData) {
                console.log('Country data found:', countryData);
            } else {
            }
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
        });
}
