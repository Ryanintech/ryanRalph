<?php
require_once('./apiFetcher.php');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Check if a country code is provided
if (isset($_GET['code'])) {
    $countryCode = $_GET['code'];

    if (empty($countryCode)) {
        echo json_encode(["error" => "Country code is required"]);
        exit;
    }

    // Fetch data by country code
    $url = "https://restcountries.com/v3.1/alpha/$countryCode";
    $response = fetchApiData($url);

    if (!$response) {
        error_log("Error: Failed to fetch data for country code $countryCode.");
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
    } else {
        error_log("Error: Unexpected response format for country code $countryCode.");
        echo json_encode(["error" => "Invalid response from API"]);
        exit;
    }
}

// Handle latitude and longitude
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

// Fetch location data
$openCageApiKey = 'b3d40e9524a94971a8421d04a455348d';
$url = "https://api.opencagedata.com/geocode/v1/json?q=$lat+$lon&key=$openCageApiKey&language=en";
$response = fetchApiData($url);

if (!$response) {
    error_log("Error: Failed to fetch data from OpenCage for lat: $lat, lon: $lon.");
    echo json_encode(["error" => "Failed to fetch data from OpenCage API"]);
    exit;
}

$data = json_decode($response, true);

if (!isset($data['results'][0]['components'])) {
    error_log("Error: No components found in OpenCage response for lat: $lat, lon: $lon.");
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

// Updated weather, population, and capital functions to use fetchApiData

function getWeatherData($lat, $lon)
{
    $weatherApiKey = 'e48daa58bb09ec71e3a60d802858f28e';
    $weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=$lat&lon=$lon&appid=$weatherApiKey&units=metric";

    $weatherResponse = fetchApiData($weatherUrl); // Using the helper function
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
    $username = 'ryanintech';
    $url = "http://api.geonames.org/countryInfoJSON?formatted=true&country=" . urlencode($countryCode) . "&username={$username}&style=full";
    $response = fetchApiData($url);

    if ($response === false) {
        return 'N/A';
    }

    $data = json_decode($response, true);
    if (!$data || !isset($data['geonames'][0]['population'])) {
        return 'N/A';
    }

    return $data['geonames'][0]['population'];
}

function getCapitalCoordinates($countryCode)
{
    $url = "https://restcountries.com/v3.1/alpha/$countryCode";
    $response = fetchApiData($url);

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
