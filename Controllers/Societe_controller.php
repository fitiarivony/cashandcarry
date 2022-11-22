<?php

namespace App\Http\Controllers;

use App\Models\Societe;
use Illuminate\Http\Request;

class Societe_controller extends Controller
{
    public function newSociete(Request $request)
    {
        $Societe = new Societe;
        $Societe->idsociete = $request->input('idsociete');
        $Societe->nomsociete = $request->input('nomsociete');
        $Societe->reference = $request->input('reference');
        $Societe->adresse = $request->input('adresse');
        $Societe->save();
        return view('ping',['titre' => 'ok']);
    }
    public function list(){
        return Societe::all();
    }
}