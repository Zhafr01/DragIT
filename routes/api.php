<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProgressController;

// Auth
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);

// Progress Leaderboard (no user ID)
Route::get('/progress/leaderboard/all', [ProgressController::class, 'leaderboard']);

// Progress per user
Route::get('/progress/{userId}',                        [ProgressController::class, 'show']);
Route::post('/progress/{userId}/xp',                   [ProgressController::class, 'addXp']);
Route::post('/progress/{userId}/game-result',           [ProgressController::class, 'recordGameResult']);
Route::post('/progress/{userId}/complete-chapter',      [ProgressController::class, 'completeChapter']);
