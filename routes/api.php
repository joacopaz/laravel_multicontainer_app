<?php

use App\Http\Controllers\Api\StarWarsController;
use App\Http\Controllers\Api\StatsController;
use Illuminate\Support\Facades\Route;

$apiVersion = env('API_VERSION', 'v1');

Route::prefix("/{$apiVersion}")->group(function () {
    Route::get('/star-wars', [StarWarsController::class, 'handler']);
    Route::get('/stats', [StatsController::class, 'handler'])->name('api.v1.stats');
});
