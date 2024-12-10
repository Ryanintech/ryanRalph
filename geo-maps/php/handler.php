<?php

require_once __DIR__ . '/../vendor/autoload.php';  // Adjusted path to vendor/autoload.php

use Dotenv\Dotenv;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');  // Adjusted to load from the root folder
$dotenv->load();

if (isset($_GET['js_env'])) {
    header('Content-Type: application/javascript');
    echo "const geoNamesUsername = '" . $_ENV['GEO_NAMES_USERNAME'] . "';";
    exit;
}
