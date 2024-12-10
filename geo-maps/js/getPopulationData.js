export function getPopulationData(countryCode) {
    fetch(`php/getPopulationData.php?country=${countryCode}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                console.warn(`Error in data: ${data.error}`);
            } else {
                console.log("Population data received:", data);
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });

}
