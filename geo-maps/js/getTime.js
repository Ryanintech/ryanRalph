export async function fetchTimeAndUpdateUI(lat, lng) {
    const url = `php/getTime.php?lat=${lat}&lng=${lng}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error('Error fetching time:', data.error);
            throw new Error(data.error);
        } else {
            // Process the time data
            updateTime(data.time);
        }
    } catch (error) {
        console.error('Error fetching time data:', error);
    }
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


