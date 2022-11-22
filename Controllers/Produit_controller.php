<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;

class Produit_controller extends Controller
{
    public function newProduit(Request $request)
    {
        $Produit = new Produit;
        $Produit->idproduit = $request->input('idproduit');
        $Produit->idbesoin = $request->input('idbesoin');
        $Produit->qualite = $request->input('qualite');
        $Produit->dateEnvoi = $request->input('dateEnvoi');
        $Produit->dateLimite = $request->input('dateLimite');
        $Produit->save();
        return view('ping',['titre' => 'ok']);
    }
    public function list(){
        return Produit::all();
    }
}
