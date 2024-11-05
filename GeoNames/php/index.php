<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $selectedApi = $_POST['api'];
    $username = 'ryanintech';
    $url = '';

    // Set the API URL based on the selected API
    if ($selectedApi === 'api1') {
        $postalcode = isset($_POST['postalcode']) ? urlencode($_POST['postalcode']) : '';
        $url = "http://api.geonames.org/postalCodeSearchJSON?postalcode={$postalcode}&maxRows=10&username={$username}";
    } elseif ($selectedApi === 'timezoneApi') {
        $latitude = isset($_POST['latitude']) ? urlencode($_POST['latitude']) : '';
        $longitude = isset($_POST['longitude']) ? urlencode($_POST['longitude']) : '';
        $url = "http://api.geonames.org/timezoneJSON?lat={$latitude}&lng={$longitude}&username={$username}";
    } elseif ($selectedApi === 'wikipediaApi') {
        $placeName = isset($_POST['placeName']) ? urlencode($_POST['placeName']) : '';
        $url = "http://api.geonames.org/wikipediaSearchJSON?q={$placeName}&maxRows=10&username={$username}";
    } else {
        echo json_encode(['error' => 'Invalid API selection.']);
        exit;
    }

    // Initialize cURL
    $ch = curl_init();

    // Set cURL options
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, false); // Don't include headers in the output

    // Execute the cURL request
    $response = curl_exec($ch);

    // Handle cURL errors
    if (curl_errno($ch)) {
        echo json_encode(['error' => 'cURL Error: ' . curl_error($ch)]);
    } else {
        // Return the response as JSON
        header('Content-Type: application/json');
        echo $response;
    }

    // Close the cURL session
    curl_close($ch);
    exit;
}
