<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProgressController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\MaterialController;

// Auth
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login',    [AuthController::class, 'login']);
Route::post('/auth/update-profile/{id}', [AuthController::class, 'updateProfile']);

// Progress Leaderboard (no user ID)
Route::get('/progress/leaderboard/all', [ProgressController::class, 'leaderboard']);

// Progress per user
Route::get('/progress/{userId}',                        [ProgressController::class, 'show']);
Route::post('/progress/{userId}/xp',                   [ProgressController::class, 'addXp']);
Route::post('/progress/{userId}/game-result',           [ProgressController::class, 'recordGameResult']);
Route::post('/progress/{userId}/complete-chapter',      [ProgressController::class, 'completeChapter']);

// Public Data
Route::get('/materials', [MaterialController::class, 'getMaterials']);
Route::get('/evaluations', [MaterialController::class, 'getEvaluations']);
Route::get('/questions', [MaterialController::class, 'getQuestions']);

// Admin
Route::get('/admin/dashboard', [AdminController::class, 'getDashboard']);
Route::post('/admin/materials', [MaterialController::class, 'updateMaterials']);
Route::post('/admin/evaluations', [MaterialController::class, 'updateEvaluations']);
