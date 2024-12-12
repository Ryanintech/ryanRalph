import { hideLoader, updateCountryModal } from "./utils.js";


export async function getWeather(latitude, longitude) {
    try {
        const response = await $.ajax({
            url: 'php/getWeatherData.php',
            method: 'GET',
            data: { lat: latitude, lon: longitude },
        });

        if (response.error) {
            throw new Error(response.error);
        }

        return response; // Assuming `response` is properly structured.
    } catch (error) {
        throw new Error(`Error fetching weather data: ${error.message || error}`);
    }
}


export function fetchWeatherAndUpdateUI(lat, lng, countryData) {
    getWeather(lat, lng)
        .then(weatherData => {
            countryData.weather = weatherData.temperature;

            updateCountryModal(countryData);
        })
        .catch(err => {
            console.error('Error fetching weather data:', err);
            countryData.weather = 'Weather data unavailable';
            updateCountryModal(countryData);
        })
        .finally(() => {
            hideLoader();
        });
}