import { showLoader, hideLoader, updateCountryModal } from "./utils.js";

export function fetchTimeAndUpdateUI(lat, lng, countryData) {
    // Show the loader at the start
    showLoader();

    updateTime(lat, lng)
        .then((timeData) => {
            console.log("Fetched time data:", timeData);

            if (!countryData) {
                throw new Error("countryData is undefined"); // Prevent further execution
            }

            // Add time data to countryData and update UI
            countryData.time = timeData.time || "Time data unavailable";
            updateCountryModal(countryData);
        })
        .catch((err) => {
            console.error("Error fetching time data:", err);
            if (countryData) {
                countryData.time = "Time data unavailable";
                updateCountryModal(countryData);
            }
        })
        .finally(() => {
            hideLoader(); // Always hide the loader when done
        });
}


export async function updateTime(latitude, longitude) {
    try {
        const response = await $.ajax({
            url: 'php/getTime.php',
            method: 'GET',
            data: { lat: latitude, lng: longitude }
        });

        console.log('Time API Response:', response); // Debugging

        // Ensure the response is an object (parse it if necessary)
        const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;

        if (parsedResponse && parsedResponse.time) {
            $('#current-time').text(parsedResponse.time);
            return parsedResponse; // Return the valid time data
        } else {
            console.error('Time data is missing in the response:', parsedResponse);
            $('#current-time').text('Time data unavailable');
            throw new Error('Invalid time response');
        }
    } catch (error) {
        console.error('Error fetching time data:', error);
        $('#current-time').text('Time data unavailable');
        throw error;
    }
}


