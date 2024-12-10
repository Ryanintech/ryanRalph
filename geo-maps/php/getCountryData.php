<?php

require_once('./handler.php');

header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if a country code is provided
if (isset($_GET['code'])) {
    $countryCode = $_GET['code'];

    if (empty($countryCode)) {
        echo json_encode(["error" => "Country code is required"]);
        exit;
    }

    // Fetch data by country code
    $url = "https://restcountries.com/v3.1/alpha/$countryCode";
    $response = @file_get_contents($url);

    if (!$response) {
        echo json_encode(["error" => "Failed to fetch data for the given country code"]);
        exit;
    }

    $data = json_decode($response, true);

    if (isset($data[0])) {
        $country = $data[0];
        $result = [
            'countryName' => $country['name']['common'] ?? 'N/A',
            'capital' => $country['capital'][0] ?? 'N/A',
            'population' => $country['population'] ?? 'N/A',
            'currency' => $country['currencies'] ?? null,
            'capitalCoordinates' => [
                'lat' => $country['capitalInfo']['latlng'][0] ?? null,
                'lng' => $country['capitalInfo']['latlng'][1] ?? null
            ],
            'wikipediaLink' => "https://en.wikipedia.org/wiki/" . str_replace(' ', '_', $country['name']['common'] ?? 'N/A')
        ];
        echo json_encode($result);
        exit;
    }
}

// Original latitude and longitude handling
if (!isset($_GET['lat']) || !isset($_GET['lon'])) {
    echo json_encode(["error" => "Latitude and longitude are required"]);
    exit;
}

$lat = $_GET['lat'];
$lon = $_GET['lon'];

if (!is_numeric($lat) || !is_numeric($lon)) {
    echo json_encode(["error" => "Invalid latitude or longitude"]);
    exit;
}

$openCageApiKey = $_ENV['OPENCAGE_API_KEY'];
$url = "https://api.opencagedata.com/geocode/v1/json?q=$lat+$lon&key=$openCageApiKey&language=en";

$response = @file_get_contents($url);
if (!$response) {
    echo json_encode(["error" => "Failed to fetch data from OpenCage API"]);
    exit;
}

$data = json_decode($response, true);
if (!isset($data['results'][0]['components'])) {
    echo json_encode(["error" => "No data found for the given location"]);
    exit;
}

$countryData = $data['results'][0]['components'];
$currencyData = $data['results'][0]['annotations']['currency'] ?? null;

$countryName = $countryData['country'] ?? $countryData['state'] ?? 'N/A';
$capital = $countryData['road'] ?? $countryData['_normalized_city'] ?? 'N/A';
$countryCode = $countryData['ISO_3166-1_alpha-2'] ?? 'N/A';
$currency = $currencyData ? [
    'name' => $currencyData['name'],
    'symbol' => $currencyData['symbol'],
    'iso_code' => $currencyData['iso_code'],
] : null;

$weatherData = getWeatherData($lat, $lon);
$populationData = getPopulationData($countryCode);
$capitalCoordinates = getCapitalCoordinates($countryCode);

$wikipediaLink = "https://en.wikipedia.org/wiki/" . str_replace(' ', '_', $countryName);

echo json_encode([
    'countryName' => $countryName,
    'capital' => $capital,
    'population' => $populationData,
    'currency' => $currency,
    'weather' => $weatherData,
    'wikipediaLink' => $wikipediaLink,
    'location' => [
        'latitude' => $lat,
        'longitude' => $lon,
        'countryCode' => $countryCode
    ],
    'capitalCoordinates' => $capitalCoordinates
]);

function getWeatherData($lat, $lon)
{
    $weatherApiKey = $_ENV['WEATHER_API_KEY'];
    $weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&appid=$weatherApiKey&units=metric";

    $weatherResponse = @file_get_contents($weatherUrl);
    if (!$weatherResponse) {
        return 'No weather data available';
    }

    $weatherData = json_decode($weatherResponse, true);
    if (isset($weatherData['main']['temp'])) {
        return $weatherData['main']['temp'] . '°C';
    } else {
        return 'No weather data available';
    }
}

function getPopulationData($countryCode)
{
    $username = $_ENV['GEONAMES_USERNAME'];
    $url = "http://api.geonames.org/countryInfoJSON?formatted=true&country=" . urlencode($countryCode) . "&username={$username}&style=full";
    $response = @file_get_contents($url);

    if ($response === false) {
        return 'N/A';
    }

    $data = json_decode($response, true);
    if (!$data || !isset($data['geonames'][0]['population'])) {
        return 'N/A';
    }

    // Return the raw population number, without commas
    return $data['geonames'][0]['population'];
}


function getCapitalCoordinates($countryCode)
{
    $url = "https://restcountries.com/v3.1/alpha/$countryCode";
    $response = @file_get_contents($url);

    if ($response === false) {
        return ['error' => 'Failed to fetch capital coordinates'];
    }

    $data = json_decode($response, true);

    if (!isset($data[0]['capitalInfo']['latlng']) || !is_array($data[0]['capitalInfo']['latlng'])) {
        return ['error' => 'Capital coordinates not found'];
    }

    return [
        'lat' => $data[0]['capitalInfo']['latlng'][0],
        'lng' => $data[0]['capitalInfo']['latlng'][1]
    ];
}
