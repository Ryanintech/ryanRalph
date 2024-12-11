import { updateCountryModal, showLoader, hideLoader } from './utils.js';

export function getCountryData(latitude, longitude) {
    showLoader();

    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'php/getCountryData.php',  // Proxy endpoint
            method: 'GET',
            data: { lat: latitude, lon: longitude },
            success: async function (data) {
                try {
                    console.log("Response Data:", data);

                    if (data.error) {
                        alert(data.error);
                        reject(data.error);
                    } else if (data.countryName === 'N/A') {
                        alert("Country data is not available for the ocean.");
                    } else {
                        updateCountryModal(data);
                        resolve(data);
                    }

                } catch (error) {
                    console.error("Error handling response: ", error);
                    alert("Error processing country data.");
                    reject(error);
                }
            },
            error: function () {
                alert("Error fetching country data. Please check the server endpoint.");
                reject(new Error("Error fetching country data."));
            },
            complete: function () {
                hideLoader();
            }
        });
    });
}
