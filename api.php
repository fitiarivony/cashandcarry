<?php

use App\Http\Controllers\Demande_ressource;
use App\Http\Controllers\General;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\Proformat_envoye;
use App\Http\Controllers\Proformat_fournisseur_controller;
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

///personnalise
Route::get('/getNoninserer',[Proformat_fournisseur_controller::class,"getNonInserer"]);
Route::post('/boncommande',[PdfController::class,"index"]);
Route::get('/fournisseurspro',[Proformat_fournisseur_controller::class,"getFournisseurs"]);
Route::get('/procommande',[Proformat_fournisseur_controller::class,"getProformat_fournisseur"]);


Route::post('/proformat_envoye',[Proformat_envoye::class,"store"]);
Route::get('/proformat_envoye',[Proformat_envoye::class,"index"]);

Route::post('/proformat_recu',[ProformatRecu::class,"store"]);
Route::get('/proformat_recu',[ProformatRecu::class,"index"]);

Route::post('/ressource',[Ressource::class,"store"]);
Route::get('/ressource',[Ressource::class,"index"]);
Route::get('/pdf',[General::class,"topdf"]);
Route::get('/Demande_ressource/details',[Demande_ressource::class,"detailsDemande"]);
Route::get('/Demande_ressource/nonlivre',[Demande_ressource::class,"demandes_ressources_non_livrer"]);



///generalise
Route::get('/{nomtable}',[General::class,"index"]);
Route::post('/{nomtable}',[General::class,"store"]);
Route::get('/{nomtable}/login',[General::class,"login"]);

