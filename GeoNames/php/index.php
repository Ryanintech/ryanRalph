<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $selectedApi = $_POST['api'];
    $username = 'ryanintech'; // Replace with your actual GeoNames username
    $url = '';

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
        echo "<p>Invalid API selection.</p>";
        exit;
    }

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo "<p class='text-danger'>cURL Error: " . curl_error($ch) . "</p>";
    } else {
        echo $response;
    }

    curl_close($ch);
    exit;
}
