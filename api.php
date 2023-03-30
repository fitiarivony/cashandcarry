<?php

use App\Http\Controllers\Bon_controller;
use App\Http\Controllers\BonCommande;
use App\Http\Controllers\BonReception;
use App\Http\Controllers\Demande_ressource;
use App\Http\Controllers\General;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\Proformat_envoye;
use App\Http\Controllers\Proformat_fournisseur_controller;
use App\Http\Controllers\ProformatRecu;
use App\Http\Controllers\Ressource;
use App\Http\Controllers\Facture_controller;
use App\Http\Controllers\Stat;
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
//Moins disant
Route::get('/listeressource',[Proformat_fournisseur_controller::class,"getRessource"]);
Route::get('/moinsdisant',[Proformat_fournisseur_controller::class,"orderMoinsDisant"]);

//Bon de commande
Route::get('/getNoninserer',[Proformat_fournisseur_controller::class,"getNonInserer"]);
// Route::post('/boncommande',[PdfController::class,"index"]);
Route::get('/fournisseurspro',[Proformat_fournisseur_controller::class,"getFournisseurs"]);
Route::get('/procommande',[Proformat_fournisseur_controller::class,"getProformat_fournisseur"]);
Route::post('/storeBon',[BonCommande::class,"store"]);
Route::get('/ListeBonComm',[BonCommande::class,"getBonCommande_idfournisseur"]);



//Bon livraison
Route::post('/storeLivraison',[Bon_controller::class,"test"]);

//Bon de reception
Route::post('/storeReception',[BonReception::class,"store"]);

//Facture
Route::post('/facture',[Facture_controller::class,"test"]);

//dispatcher
Route::post('/dispatcher',[Demande_ressource::class,"dispatcher"]);

//stock
Route::post('/stock',[General::class,"stock"]);

//stock_fournisseur
Route::post('/stock_fournisseur',[General::class,"stock_fournisseur"]);

Route::post('/proformat_envoye',[Proformat_envoye::class,"store"]);
Route::get('/proformat_envoye',[Proformat_envoye::class,"index"]);

Route::post('/proformat_recu',[ProformatRecu::class,"store"]);
Route::get('/proformat_recu',[ProformatRecu::class,"index"]);

Route::post('/ressource',[Ressource::class,"store"]);
Route::get('/ressource',[Ressource::class,"index"]);
Route::get('/Demande_ressource/details',[Demande_ressource::class,"detailsDemande"]);
Route::get('/Demande_ressource/nonlivre',[Demande_ressource::class,"demandes_ressources_non_livrer"]);

Route::get('/getNoninsererClient',[Proformat_fournisseur_controller::class,"getNonInsererClient"]);

Route::get('/getStockRessource',[Proformat_fournisseur_controller::class,"getStockRessource"]);

// Vente
// Bon de commande
Route::get('/clientspro',[Proformat_fournisseur_controller::class,"getClients"]);
Route::get('/procommandeclient',[Proformat_fournisseur_controller::class,"getProformat_client"]);

//Stat
Route::get('/stat_achat_fournisseur',[Stat::class,"statAchatFournisseur"]);
Route::get('/stat_achat_client',[Stat::class,"statAchatClient"]);




///generalise
Route::get('/{nomtable}',[General::class,"index"]);
Route::post('/{nomtable}',[General::class,"store"]);
Route::get('/{nomtable}/login',[General::class,"login"]);

