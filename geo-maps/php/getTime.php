<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow all origins
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

// Check if lat and lng are provided
$latitude = isset($_GET['lat']) ? $_GET['lat'] : null;
$longitude = isset($_GET['lng']) ? $_GET['lng'] : null;

if (!$latitude || !$longitude) {
    echo json_encode(['error' => 'Latitude and Longitude are required']);
    exit;
}

$geoNamesUsername = 'ryanintech';
$geoNamesUrl = "http://api.geonames.org/timezoneJSON?lat=" . urlencode($latitude) . "&lng=" . urlencode($longitude) . "&username=" . urlencode($geoNamesUsername);

// Log the URL for debugging
error_log('GeoNames API URL: ' . $geoNamesUrl);

$ch = curl_init($geoNamesUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

// Check for errors
if ($response === false) {
    echo json_encode(['error' => 'Error fetching data from GeoNames: ' . curl_error($ch)]);
    exit;
}

$responseData = json_decode($response, true);

// Check if GeoNames API returned an error in the response
if (isset($responseData['status']) && $responseData['status']['message'] != 'ok') {
    echo json_encode(['error' => 'GeoNames API error: ' . $responseData['status']['message']]);
    exit;
}

echo $response;
