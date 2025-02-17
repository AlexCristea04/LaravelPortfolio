<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TestimonialController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
    return response()->json(['message' => 'This is a test route']);
});

// public routes
Route::post('/admin/login', [AuthController::class, 'login']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/testimonials/{testimonial}', [TestimonialController::class, 'show']);
Route::post('/testimonials', [TestimonialController::class, 'store']);
Route::post('/admin/register', [AuthController::class, 'register']);

// protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/admin/logout', [AuthController::class, 'logout']);
    Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update']);
    Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy']);
    Route::patch('/testimonials/{testimonial}/approve', [TestimonialController::class, 'approve']);
    Route::patch('/testimonials/{testimonial}/unapprove', [TestimonialController::class, 'unapprove']);
    Route::apiResource('projects', ProjectController::class)->except(['index', 'show']);
    Route::post('/admin/logout', [AuthController::class, 'logout']);
    Route::get('/admin/verify-token', [AuthController::class, 'verifyToken']);
});
