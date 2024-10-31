$(document).ready(function () {
    // Handle button click events
    $('.submit-btn').on('click', function () {
        const selectedApi = $(this).data('api'); // Get the selected API from the button
        const postalcode = $('#postalcode').val(); // Get the value of the postal code input

        console.log(`Selected API: ${selectedApi}, Postal Code: ${postalcode}`); // Debugging log

        // Send the form data using AJAX
        $.ajax({
            type: 'POST',
            url: 'php/index.php', // Correct path to the PHP file
            data: { api: selectedApi, postalcode: postalcode }, // Send the selected API and postal code
            success: function (response) {
                console.log(`Response received: ${response}`); // Debugging log
                displayFormattedResponse(response, selectedApi);
            },
            error: function (xhr, status, error) {
                console.error(`AJAX Error: ${status}, ${error}`); // Log AJAX errors
                $('#apiResponse').html('<p class="text-danger">An error occurred during the AJAX request.</p>');
            }
        });
    });

    // Function to format and display the API response
    function displayFormattedResponse(response, selectedApi) {
        let jsonData;

        try {
            jsonData = JSON.parse(response);
        } catch (error) {
            console.error('JSON Parsing Error:', error); // Log parsing errors
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

            case 'api2':
                // Handle API 2 response
                break;

            case 'api3':
                // Handle API 3 response
                break;

            default:
                outputHtml += '<p class="text-danger">Unknown API selected.</p>';
        }

        $('#apiResponse').html(outputHtml);
    }
});
