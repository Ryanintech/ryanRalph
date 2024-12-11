<?php
header('Content-Type: application/json');
echo json_encode(['message' => 'Hello World']);

header('Access-Control-Allow-Origin: *');

require_once('./handler.php');

if (isset($_GET['country'])) {
    $countryCode = $_GET['country'];
    $username = $_ENV['GEONAMES_USERNAME'];

    $url = "http://api.geonames.org/countryInfoJSON?country=" . urlencode($countryCode) . "&username={$username}";
    $response = @file_get_contents($url);

    if ($response === false) {
        http_response_code(502);
        echo json_encode(['error' => 'Failed to fetch data from GeoNames API']);
        exit;
    }

    $data = json_decode($response, true);

    if (isset($data['geonames'][0])) {
        $countryInfo = $data['geonames'][0];
        $formattedData = [
            'population' => $countryInfo['population'] ?? 'N/A',
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
