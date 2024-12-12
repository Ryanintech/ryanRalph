export async function fetchTimeAndUpdateUI(lat, lng) {
    const url = `php/getTime.php?lat=${lat}&lng=${lng}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {  // Checking if response was successful
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();


        if (data.error) {
            console.error('Error fetching time:', data.error);
            throw new Error(data.error);
        } else {
            $('#current-time').text(data.time); // Updating the UI with the time
        }
    } catch (error) {
        console.error('Error fetching time data:', error);
    }
}



export function updateTime(lat, lng) {
    const url = `php/getTime.php?lat=${lat}&lng=${lng}`;

    $.ajax({
        url: url,
        method: 'GET',
        success: function (response) {
            if (response && response.time) {
                $('#current-time').text(response.time);
            } else {
                console.error('Failed to fetch current time:', response);
            }
        },
        error: function () {
            console.error('Failed to fetch current time.');
        }
    });
}

