<?php

namespace App\Http\Controllers;

use App\Models\Demande_ressource;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class Demande_ressource_controller extends Controller
{
    public function newDemande_ressource(Request $request)
    {
        $Demande_ressource = new Demande_ressource;
        $Demande_ressource->id = $request->input('id');
        $Demande_ressource->iddemande_ressource = $request->input('iddemande_ressource');
        $Demande_ressource->idressource = $request->input('idressource');
        $Demande_ressource->quantite = $request->input('quantite');
        $Demande_ressource->iddept = $request->input('iddept');
        $Demande_ressource->datedemande = $request->input('datedemande');
        $Demande_ressource->dateLimite = $request->input('dateLimite');
        $Demande_ressource->save();
        return view('ping',['titre' => 'ok']);
    }

    public function list(){
        return Demande_ressource::all();
    }

    public function demandeGroupe(Request $request){
        $nombre_de_demande = (int)$request->input('nombre_de_demande');
        $demande = array();
        for ($i=0; $i < $nombre_de_demande; $i++) { 
            $Demande[$i] = new Demande_ressource;
            $Demande[$i]->id = $request->input('id');
            $Demande[$i]->iddemande_ressource = $request->input('iddemande_ressource');
            $Demande[$i]->idressource = $request->input('idressource');
            $Demande[$i]->quantite = $request->input('quantite');
            $Demande[$i]->iddept = $request->input('iddept');
            $Demande[$i]->datedemande = $request->input('datedemande');
            $Demande[$i]->dateLimite = $request->input('dateLimite');
            $Demande[$i]->save();
        }
    }
}
