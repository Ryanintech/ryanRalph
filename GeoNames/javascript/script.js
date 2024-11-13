$(document).ready(function () {
    $('.submit-btn').on('click', function () {
        const selectedApi = $(this).data('api');
        let params = { api: selectedApi };

        // Collect input values based on the selected API
        if (selectedApi === 'api1') {
            params.postalcode = $('#postalcode').val();
        } else if (selectedApi === 'timezoneApi') {
            params.latitude = $('#latitude').val();
            params.longitude = $('#longitude').val();
        } else if (selectedApi === 'wikipediaApi') {
            params.placeName = $('#placeName').val();
        } else {
            $('#apiResponse').html('<p class="text-danger">Unknown API selected.</p>');
            return;
        }

        // AJAX request to PHP handler
        $.ajax({
            url: 'php/index.php',
            type: 'POST',
            dataType: 'json',
            data: params,
            success: function (result) {
                if (result.status && result.status.name === "ok") {
                    displayFormattedResponse(result.data, selectedApi);
                } else {
                    $('#apiResponse').html('<p class="text-danger">An error occurred in the response.</p>');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(`AJAX Error: ${textStatus}, ${errorThrown}`);
                console.error(jqXHR.responseText); // Log full error response for debugging
                $('#apiResponse').html('<p class="text-danger">An error occurred during the AJAX request.</p>');
            }
        });
    });

    function displayFormattedResponse(data, selectedApi) {
        let outputHtml = '';

        if (selectedApi === 'api1') {
            outputHtml += '<h3>Postcode Results</h3><table class="table table-bordered"><thead><tr><th>Place Name</th><th>Postal Code</th></tr></thead><tbody>';
            data.postalCodes.forEach(code => {
                outputHtml += `<tr><td>${code.placeName}</td><td>${code.postalCode}</td></tr>`;
            });
            outputHtml += '</tbody></table>';
        } else if (selectedApi === 'timezoneApi') {
            outputHtml += `<h3>Timezone Results</h3><p>Country: ${data.countryName}</p><p>Local Time: ${data.time}</p>`;
        } else if (selectedApi === 'wikipediaApi') {
            outputHtml += '<h3>Wikipedia Results</h3>';
            outputHtml += `<table class="table table-bordered"><thead><tr><th>Title</th><th>Description</th></tr></thead><tbody>`;
            data.geonames.forEach(entry => {
                outputHtml += `<tr>
                                <td><a href="https://en.wikipedia.org/wiki/${encodeURIComponent(entry.title)}" target="_blank">${entry.title}</a></td>
                                <td>${entry.summary}</td>
                              </tr>`;
            });
            outputHtml += `</tbody></table>`;
        }

        $('#apiResponse').html(outputHtml);
    }
});
