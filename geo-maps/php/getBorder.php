<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (!isset($_GET['countryCode'])) {
    echo json_encode(["error" => "Country code is required"]);
    exit;
}

$countryCode = $_GET['countryCode'];
$geoJsonPath = '../countryBorders.geo.json';

if (!file_exists($geoJsonPath)) {
    echo json_encode(["error" => "GeoJSON file not found"]);
    exit;
}

$data = file_get_contents($geoJsonPath);
$countries = json_decode($data, true);

if (!$countries || !isset($countries['features'])) {
    echo json_encode(["error" => "Invalid GeoJSON format"]);
    exit;
}

$borderData = null;
foreach ($countries['features'] as $feature) {
    if ($feature['properties']['iso_a2'] === $countryCode) {
        $borderData = $feature;
        break;
    }
}

echo $borderData ? json_encode($borderData) : json_encode(["error" => "Country not found"]);
