<?php

namespace App\Http\Controllers;

use App\Models\Fournisseur;
use Illuminate\Http\Request;

class Fournisseur_controller extends Controller
{
    public function newFournisseur(Request $request)
    {
        $Demande_ressource = new Fournisseur;
        $Demande_ressource->idfournisseur = $request->input('idfournisseur');
        $Demande_ressource->nomfournisseur = $request->input('nomfournisseur');
        $Demande_ressource->adresse = $request->input('adresse');
        $Demande_ressource->contact = $request->input('contact');
        $Demande_ressource->codefournisseur = $request->input('codefournisseur');
        $Demande_ressource->save();
        return view('ping',['titre' => 'ok']);
    }

    public function list(){
        return Fournisseur::all();
    }
}
