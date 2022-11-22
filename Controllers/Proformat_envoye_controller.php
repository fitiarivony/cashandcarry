<?php

namespace App\Http\Controllers;

use App\Models\Proformat_envoye;
use Illuminate\Http\Request;

class Proformat_envoye_controller extends Controller
{
    public function newProformat_envoye(Request $request)
    {
        $Demande_ressource = new Proformat_envoye;
        $Demande_ressource->id = $request->input('id');
        $Demande_ressource->idprenvoye = $request->input('idprenvoye');
        $Demande_ressource->reference = $request->input('reference');
        $Demande_ressource->idressource = $request->input('idressource');
        $Demande_ressource->intitule = $request->input('intitule');
        $Demande_ressource->quantite = $request->input('quantite');
        $Demande_ressource->idfournisseur = $request->input('idfournisseur');
        $Demande_ressource->save();
        return view('ping',['titre' => 'ok']);
    }

    public function list(){
        return Proformat_envoye::all();
    }
}
