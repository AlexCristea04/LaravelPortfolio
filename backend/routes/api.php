<?php

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

Route::apiResource('projects', ProjectController::class);
Route::apiResource('testimonials', TestimonialController::class);
Route::patch('testimonials/{testimonial}/approve', [TestimonialController::class, 'approve']);
Route::patch('testimonials/{testimonial}/unapprove', [TestimonialController::class, 'unapprove']);
