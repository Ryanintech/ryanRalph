<?php
header('Content-Type: application/json');
require_once('./handler.php');
// Set the coordinates and GeoNames username
$latitude = $_GET['lat'];
$longitude = $_GET['lng'];
$username = $_ENV['GEONAMES_USERNAME'];
// Build the API URL using HTTP
$geoNamesUrl = "http://api.geonames.org/timezoneJSON?lat=$latitude&lng=$longitude&username=$username";

// Make the request to GeoNames API
$response = file_get_contents($geoNamesUrl);

if ($response === FALSE) {
    // Handle error if request fails
    echo json_encode(['error' => 'Failed to fetch current time']);
} else {
    // Return the response back to the frontend
    echo $response;
}
