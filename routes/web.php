<?php

use App\Http\Controllers\Web\ResourceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

Route::get('/', function () {
    return Inertia::render('landing');
});

Route::get('/{resourceType}/{uid}', [ResourceController::class, 'show'])
    ->whereIn('resourceType', ['people', 'People', 'movies', 'Movies'])
    ->whereNumber('uid');

Route::fallback(function () {
    return Inertia::render('error', ['status' => 404, 'message' => 'The Star Wars resource you requested could not be found.'])
        ->toResponse(request())
        ->setStatusCode(Response::HTTP_NOT_FOUND);
});
