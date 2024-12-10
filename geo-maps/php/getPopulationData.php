<?php
header('Content-Type: application/json');
require_once('./handler.php');

if (isset($_GET['country'])) {
    $countryCode = $_GET['country'];
    $username = $_ENV['GEONAMES_USERNAME'];

    $url = "http://api.geonames.org/countryInfo?country=" . urlencode($countryCode) . "&username={$username}";
    $response = @file_get_contents($url);

    if ($response === false) {
        http_response_code(502);
        echo json_encode(['error' => 'Failed to fetch data from GeoNames API']);
        exit;
    }

    // Load the XML response
    $xml = @simplexml_load_string($response);
    if (!$xml) {
        http_response_code(502);
        echo json_encode(['error' => 'Invalid XML response from GeoNames API']);
        exit;
    }

    $countryInfo = $xml->country;
    if ($countryInfo) {
        $formattedData = [
            'population' => (string)$countryInfo->population ?? 'N/A',
        ];
        echo json_encode($formattedData);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'No country information found']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Country code not provided']);
}
