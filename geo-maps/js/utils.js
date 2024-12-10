// Extract all coordinates from a given geometry
export function extractCoordinates(geometry) {
    let coordinates = [];
    if (geometry.type === "MultiPolygon") {
        coordinates = flattenMultiPolygon(geometry.coordinates);
    } else if (geometry.type === "Polygon") {
        coordinates = geometry.coordinates[0];
    }
    return coordinates;
}

// Flattens a multipolygon countries into a single list of coordinates
function flattenMultiPolygon(multiPolygon) {
    return multiPolygon.flat(2);
}

// Calculates the geographical center of a set of coordinates
export function calculateCenter(coordinates) {
    const validCoordinates = coordinates.filter(coord => Array.isArray(coord) && coord.length === 2 && !coord.includes(NaN));
    if (!validCoordinates.length) return null;

    const latitudes = validCoordinates.map(coord => coord[1]);
    const longitudes = validCoordinates.map(coord => coord[0]);

    const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
    const avgLon = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

    return [avgLat, avgLon];
}

export function capitalizeFirstLetter(str) {
    // Ensure that str is a string before applying string methods
    if (typeof str !== 'string') {
        str = String(str);  // Convert non-string values to a string
    }
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

// Function to update country modal
export function updateCountryModal(countryData) {
    $('#country-name').text(countryData.countryName);
    $('#current-time').text(countryData.timezone);
    $('#capital').text(countryData.capital);

    // Format population with commas
    const population = countryData.population ? Number(countryData.population).toLocaleString() : 'N/A';
    $('#population').text(population);

    let currencyText = 'N/A';
    if (countryData.currency) {
        if (countryData.currency.name && countryData.currency.symbol) {
            currencyText = `${countryData.currency.symbol} ${countryData.currency.name}`;
        } else if (Object.keys(countryData.currency).length === 1) {
            const currencyCode = Object.keys(countryData.currency)[0];
            const currencyDetails = countryData.currency[currencyCode];
            currencyText = `${currencyDetails.symbol} ${currencyDetails.name}`;
        }
    }
    $('#currency').text(capitalizeFirstLetter(currencyText));
    $('#weather').text(countryData.weather);
    $('#wikipedia-link')
        .attr('href', countryData.wikipediaLink || '#')
        .text(capitalizeFirstLetter(countryData.wikipediaLink ? `Wikipedia for ${countryData.countryName}` : 'No link available'));

    $('#country-modal').show();
}


export function showLoader() {
    $('#loader').show();
}

export function hideLoader() {
    $('#loader').hide();
}

export function openModal() {
    $('#country-modal').show();
}
