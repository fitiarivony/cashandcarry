<?php

use App\Http\Controllers\General;
use App\Http\Controllers\Proformat_envoye;
use App\Http\Controllers\ProformatRecu;
use App\Http\Controllers\Ressource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/proformat_envoye',[Proformat_envoye::class,"store"]);
Route::get('/proformat_envoye',[Proformat_envoye::class,"index"]);

Route::post('/proformat_recu',[ProformatRecu::class,"store"]);
Route::get('/proformat_recu',[ProformatRecu::class,"index"]);

Route::post('/ressource',[Ressource::class,"store"]);
Route::get('/ressource',[Ressource::class,"index"]);

Route::get('/{nomtable}',[General::class,"index"]);
Route::post('/{nomtable}',[General::class,"store"]);
Route::get('/{nomtable}/login',[General::class,"login"]);
