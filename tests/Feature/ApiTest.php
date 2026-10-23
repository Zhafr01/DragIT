<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('api health check returns ok', function () {
    $response = $this->get('/up');
    $response->assertStatus(200);
});

test('api login requires email and password', function () {
    $response = $this->postJson('/api/auth/login', []);
    $response->assertStatus(422);
});

test('api login with wrong credentials returns 401', function () {
    $response = $this->postJson('/api/auth/login', [
        'email' => 'wrong@example.com',
        'password' => 'wrongpassword',
    ]);
    $response->assertStatus(401);
});

test('api register creates new user', function () {
    $response = $this->postJson('/api/auth/register', [
        'full_name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        'role' => 'siswa',
    ]);
    $response->assertStatus(201);
    $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
});

test('api login with valid credentials returns user', function () {
    User::create([
        'full_name' => 'Test Login User',
        'email' => 'user@example.com',
        'password' => bcrypt('password123'),
        'role' => 'siswa',
    ]);

    $response = $this->postJson('/api/auth/login', [
        'email' => 'user@example.com',
        'password' => 'password123',
    ]);
    $response->assertStatus(200);
    $response->assertJsonStructure(['user']);
});

test('api materials endpoint returns data', function () {
    $response = $this->getJson('/api/materials');
    $response->assertStatus(200);
});

test('api evaluations endpoint returns data', function () {
    $response = $this->getJson('/api/evaluations');
    $response->assertStatus(200);
});
