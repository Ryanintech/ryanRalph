<?php
header('Content-Type: application/json');
require_once('./handler.php');

// Validate the latitude and longitude to ensure they are numbers
if (!isset($_GET['lat']) || !isset($_GET['lon']) || !is_numeric($_GET['lat']) || !is_numeric($_GET['lon'])) {
    echo json_encode(["error" => "Invalid latitude or longitude provided"]);
    exit;
}

$lat = $_GET['lat'];
$lon = $_GET['lon'];

$weatherApiKey = $_ENV['WEATHER_API_KEY'];
$weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&appid=$weatherApiKey&units=metric";

// Initialize cURL to fetch weather data
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $weatherUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);

// Check if cURL request was successful
if ($response === false) {
    echo json_encode(["error" => "Failed to fetch weather data"]);
    exit;
}

$weatherData = json_decode($response, true);
curl_close($ch);

if (isset($weatherData['main']['temp'])) {
    $temperature = $weatherData['main']['temp'];
    echo json_encode(["temperature" => $temperature . '°C']);
} else {
    echo json_encode(["error" => "No weather data available"]);
}
