<?php

namespace App\Http\Controllers;

use App\Models\Ressource;
use Illuminate\Http\Request;

class Ressource_controller extends Controller
{
    public function newRessource(Request $request)
    {
        $ressource = new Ressource;
        $ressource->idressource = $request->input('idressource');
        $ressource->nomressource = $request->input('nomressource');
        $ressource->idachattype = $request->input('idachattype');
        $ressource->save();
        return view('ping',['titre' => 'ok']);
    }
    public function list(){
        return Ressource::all();
    }
}
