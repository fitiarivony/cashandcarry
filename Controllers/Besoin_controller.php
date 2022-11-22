<?php

namespace App\Http\Controllers;

use App\Models\Besoin;
use Illuminate\Http\Request;

class Besoin_controller extends Controller
{
    public function newBesoin(Request $request)
    {
        $Besoin = new Besoin;
        $Besoin->idbesoin = $request->input('idbesoin');
        $Besoin->quantite = $request->input('quantite');
        $Besoin->iddept = $request->input('iddept');
        $Besoin->idressource = $request->input('idressource');
        $Besoin->save();
        return view('ping',['titre' => 'ok']);
    }
    public function list(){
        return Besoin::all();
    }
}
