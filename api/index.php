<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Fix: Vercel sets SCRIPT_NAME to /api/index.php which causes Symfony HttpFoundation
// to strip /api prefix from REQUEST_URI, making Laravel see /auth/login instead of /api/auth/login.
// Override to root so the full URI is preserved for Laravel routing.
$_SERVER['SCRIPT_NAME'] = '/index.php';
$_SERVER['PHP_SELF'] = '/index.php';
$_SERVER['SCRIPT_FILENAME'] = __DIR__.'/../public/index.php';

// CORS headers for React SPA
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Create writable directories in /tmp for Vercel's read-only filesystem
$dirs = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/logs',
    '/tmp/bootstrap/cache',
];
foreach ($dirs as $dir) {
    if (! is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
