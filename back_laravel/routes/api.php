<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TradeController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::get('/wallet', [TradeController::class, 'wallet']);
    Route::get('/market/btc', [TradeController::class, 'market']);
    Route::post('/trade/buy', [TradeController::class, 'buy']);
    Route::post('/trade/sell', [TradeController::class, 'sell']);
    Route::get('/transactions', [TradeController::class, 'transactions']);
});
