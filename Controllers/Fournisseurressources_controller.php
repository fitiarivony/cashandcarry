<?php

namespace App\Http\Controllers;

use App\Models\Fournisseurressources;
use Illuminate\Http\Request;

class Fournisseurressources_controller extends Controller
{
    public function newFournisseurressources(Request $request)
    {
        $Fournisseurressources = new Fournisseurressources;
        $Fournisseurressources->idressource = $request->input('idressource');
        $Fournisseurressources->idfournisseur = $request->input('idfournisseur');
        $Fournisseurressources->save();
        return view('ping',['titre' => 'ok']);
    }
    public function list(){
        return Fournisseurressources::all();
    }
}
