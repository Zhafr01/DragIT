<?php
// Minimal test - no Laravel, just pure PHP
header('Content-Type: application/json');

echo json_encode([
    'status' => 'ok',
    'php_version' => PHP_VERSION,
    'extensions' => get_loaded_extensions(),
    'env_app_key_set' => !empty($_ENV['APP_KEY'] ?? getenv('APP_KEY')),
    'env_db_connection' => $_ENV['DB_CONNECTION'] ?? getenv('DB_CONNECTION') ?? 'not set',
    'env_postgres_url_set' => !empty($_ENV['POSTGRES_URL'] ?? getenv('POSTGRES_URL')),
]);
