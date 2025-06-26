<?php
// CORS
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type");
// header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");




if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../Controller/JuegoController.php';
