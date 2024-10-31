$(document).ready(function () {
    // Handle button click events
    $('.submit-btn').on('click', function () {
        const selectedApi = $(this).data('api');
        let postalcode = '';
        let latitude = '';
        let longitude = '';

        if (selectedApi === 'api1') {
            postalcode = $('#postalcode').val();
        } else if (selectedApi === 'timezoneApi') {
            latitude = $('#latitude').val();
            longitude = $('#longitude').val();
        }

        // Prepare the data to send in the AJAX request
        const requestData = { api: selectedApi };

        if (postalcode) {
            requestData.postalcode = postalcode;
        }
        if (latitude) {
            requestData.latitude = latitude;
        }
        if (longitude) {
            requestData.longitude = longitude;
        }

        // Send the form data using AJAX
        $.ajax({
            type: 'POST',
            url: 'php/index.php',
            data: requestData,
            success: function (response) {
                console.log(`Response received: ${response}`);
                displayFormattedResponse(response, selectedApi);
            },
            error: function (xhr, status, error) {
                console.error(`AJAX Error: ${status}, ${error}`);
                $('#apiResponse').html('<p class="text-danger">An error occurred during the AJAX request.</p>');
            }
        });
    });

    function displayFormattedResponse(response, selectedApi) {
        let jsonData;

        try {
            jsonData = JSON.parse(response);
        } catch (error) {
            console.error('JSON Parsing Error:', error);
            $('#apiResponse').html('<p class="text-danger">Invalid JSON response.</p>');
            return;
        }

        let outputHtml = '';

        switch (selectedApi) {
            case 'api1':
                if (jsonData.error) {
                    outputHtml += `<p class="text-danger">${jsonData.error}</p>`;
                } else {
                    outputHtml += '<h3>Postcode Results</h3>';
                    outputHtml += `<table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Place Name</th>
                                            <th>Postal Code</th>
                                            <th>Admin Area 1</th>
                                            <th>Admin Area 2</th>
                                            <th>Longitude</th>
                                            <th>Latitude</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;
                    jsonData.postalCodes.forEach(postalCode => {
                        outputHtml += `<tr>
                                        <td>${postalCode.placeName}</td>
                                        <td>${postalCode.postalCode}</td>
                                        <td>${postalCode.adminName1}</td>
                                        <td>${postalCode.adminName2}</td>
                                        <td>${postalCode.lng}</td>
                                        <td>${postalCode.lat}</td>
                                      </tr>`;
                    });
                    outputHtml += `</tbody></table>`;
                }
                break;

            case 'timezoneApi':
                // Check if there's an error in the response
                if (jsonData.status) {
                    outputHtml += `<p class="text-danger">Error: ${jsonData.status.message}</p>`;
                    $('#apiResponse').html(outputHtml);
                    return;
                }

                outputHtml += '<h3>Timezone Results</h3>';
                outputHtml += `<p>Country Code: ${jsonData.countryCode}</p>`;
                outputHtml += `<p>Country Name: ${jsonData.countryName}</p>`;
                outputHtml += `<p>Timezone ID: ${jsonData.timezoneId}</p>`;
                outputHtml += `<p>Local Time: ${jsonData.time}</p>`;
                outputHtml += `<p>Sunrise: ${jsonData.sunrise}</p>`;
                outputHtml += `<p>Sunset: ${jsonData.sunset}</p>`;
                outputHtml += `<p>Raw Offset: ${jsonData.rawOffset}</p>`;
                outputHtml += `<p>GMT Offset: ${jsonData.gmtOffset}</p>`;
                outputHtml += `<p>DST Offset: ${jsonData.dstOffset}</p>`;
                break;

            case 'api3':
                outputHtml += '<p class="text-danger">Im doing it now again.</p>';
                break;

            default:
                outputHtml += '<p class="text-danger">Unknown API selected.</p>';
        }

        $('#apiResponse').html(outputHtml);
    }
});
