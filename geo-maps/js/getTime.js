const GEO_NAMES_USERNAME = 'ryanintech';

export function updateTime(lat, lng) {
    const url = `http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lng}&username=${GEO_NAMES_USERNAME}`;

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
