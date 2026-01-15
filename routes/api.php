<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RsvpController;
use App\Http\Controllers\Api\MessageController;

Route::post('/rsvp', [RsvpController::class, 'store']);
Route::get('/messages', [MessageController::class, 'index']);
Route::post('/messages', [MessageController::class, 'store']);
Route::get('/test', function () {
    return 'API OK';
});

use App\Models\Donation;

Route::get('/donations', function () {
    return Donation::all();
});

use App\Models\Event;

Route::get('/event', function () {
    return Event::first();
});
