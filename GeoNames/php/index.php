<?php
// Enable error reporting for development
ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);
$username = 'ryanintech';

if (isset($_POST['api'])) {
    $selectedApi = $_POST['api'];
    $url = '';

    if ($selectedApi === 'api1' && isset($_POST['postalcode'])) {
        $postalcode = urlencode($_POST['postalcode']);
        $url = "http://api.geonames.org/postalCodeSearchJSON?postalcode={$postalcode}&maxRows=10&username={$username}";
    } elseif ($selectedApi === 'timezoneApi' && isset($_POST['latitude'], $_POST['longitude'])) {
        $latitude = urlencode($_POST['latitude']);
        $longitude = urlencode($_POST['longitude']);
        $url = "http://api.geonames.org/timezoneJSON?lat={$latitude}&lng={$longitude}&username={$username}";
    } elseif ($selectedApi === 'wikipediaApi' && isset($_POST['placeName'])) {
        $placeName = urlencode($_POST['placeName']);
        $url = "http://api.geonames.org/wikipediaSearchJSON?q={$placeName}&maxRows=10&username={$username}";
    } else {
        echo json_encode(['error' => 'Invalid API selection or missing parameters']);
        exit;
    }

    // Initialize cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);

    // Execute cURL and decode response
    $result = curl_exec($ch);
    curl_close($ch);

    $decode = json_decode($result, true);

    // Prepare output as JSON
    $output = [
        'status' => [
            'code' => 200,
            'name' => 'ok',
            'description' => 'success',
            'returnedIn' => intval((microtime(true) - $executionStartTime) * 1000) . " ms"
        ],
        'data' => $decode
    ];

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
} else {
    echo json_encode(['error' => 'API not specified']);
}
