<?php
if (isset($_GET['lat']) && isset($_GET['lng'])) {
    $lat = $_GET['lat'];
    $lng = $_GET['lng'];
    $username = 'ryanintech';

    $url = "http://api.geonames.org/timezoneJSON?lat=$lat&lng=$lng&username=$username";

    // Ensure to handle possible failure in the file_get_contents call
    $response = @file_get_contents($url);

    if ($response === FALSE) {
        echo json_encode(["error" => "Failed to fetch current time"]);
    } else {
        $response_data = json_decode($response, true);
        if (isset($response_data['time'])) {
            echo json_encode(["time" => $response_data['time']]);
        } else {
            echo json_encode(["error" => "Time data not available"]);
        }
    }
} else {
    echo json_encode(["error" => "Missing lat/lng parameters"]);
}
