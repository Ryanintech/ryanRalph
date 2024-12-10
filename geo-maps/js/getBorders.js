import { calculateCenter, extractCoordinates, updateCountryModal, showLoader, hideLoader } from './utils.js';
export function getBorderData(countryCode) {
    showLoader();

    return fetch(`./countryBorders.geo.json?${countryCode}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const countryData = data.features.find(feature => feature.properties.iso_a2 === countryCode);
            if (countryData) {
                const { geometry, properties } = countryData;
                updateCountryModal(properties);
                const coordinates = extractCoordinates(geometry);
                const center = calculateCenter(coordinates);
                return center || null;
            } else {
                console.warn('Country not found in geoJSON:', countryCode);
                return null;
            }
        })
        .catch(error => {
            console.error('Error fetching border data:', error);
            return null;
        })
        .finally(() => {
            hideLoader();
        });
}
