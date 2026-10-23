<?php

// Temporary: show errors for debugging
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

define('LARAVEL_START', microtime(true));

// Create writable directories in /tmp for Vercel's read-only filesystem
$tmpDirs = [
    '/tmp/storage/framework/views',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/logs',
    '/tmp/bootstrap/cache',
];

foreach ($tmpDirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

// Copy bootstrap cache if needed
if (!file_exists('/tmp/bootstrap/cache/.gitignore')) {
    @copy(__DIR__.'/../bootstrap/cache/.gitignore', '/tmp/bootstrap/cache/.gitignore');
}

// Load autoloader
require __DIR__.'/../vendor/autoload.php';

// Boot the application
$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
