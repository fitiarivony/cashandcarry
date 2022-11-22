<?php

namespace App\Http\Controllers;

use App\Models\Proformat_fournisseur;
use Illuminate\Http\Request;

class Proformat_fournisseur_controller extends Controller
{
    public function newProformat_fournisseur(Request $request)
    {
        $Demande_ressource = new Proformat_fournisseur;
        $Demande_ressource->id = $request->input('id');
        $Demande_ressource->idproformat_fournisseur = $request->input('idproformat_fournisseur');
        $Demande_ressource->idfournisseur = $request->input('idfournisseur');
        $Demande_ressource->idreferencedemande = $request->input('idreferencedemande');
        $Demande_ressource->qualite = $request->input('qualite');
        $Demande_ressource->quantite = $request->input('quantite');
        $Demande_ressource->delailivraison = $request->input('delailivraison');
        $Demande_ressource->lieulivraison = $request->input('lieulivraison');
        $Demande_ressource->save();
        return view('ping',['titre' => 'ok']);
    }

    public function list(){
        return Proformat_fournisseur::all();
    }
}
