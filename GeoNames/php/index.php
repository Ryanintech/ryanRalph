<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the selected API from the form
    $selectedApi = $_POST['api'];
    $postalcode = isset($_POST['postalcode']) ? urlencode($_POST['postalcode']) : '';
    $username = 'ryanintech'; // Replace with your actual GeoNames username

    // Initialize cURL session
    $ch = curl_init();
    $url = '';

    // Set the URL based on the selected API
    if ($selectedApi === 'api1') {
        $url = "http://api.geonames.org/postalCodeSearchJSON?postalcode={$postalcode}&maxRows=10&username={$username}";
    } elseif ($selectedApi === 'api2') {
        $url = 'https://api.example.com/api2'; // Replace with the actual API URL for API 2
    } elseif ($selectedApi === 'api3') {
        $url = 'https://api.example.com/api3'; // Replace with the actual API URL for API 3
    } else {
        echo json_encode(["error" => "Invalid API selection."]);
        exit;
    }

    // Set cURL options
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the cURL request
    $response = curl_exec($ch);

    // Check for cURL errors
    if (curl_errno($ch)) {
        echo json_encode(["error" => "cURL Error: " . curl_error($ch)]);
    } else {
        // Return the response as JSON
        echo $response;
    }

    // Close the cURL session
    curl_close($ch);
    exit;
}
?>
