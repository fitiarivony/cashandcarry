<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use Illuminate\Http\Request;

class Departement_controller extends Controller
{
    public function newDepartement(Request $request)
    {
        $Departement = new Departement;
        $Departement->iddept = $request->input('iddept');
        $Departement->nomdepartement = $request->input('nomdepartement');
        $Departement->save();
        return view('ping',['titre' => 'ok']);
    }
    public function list(){
        return Departement::all();
    }
}
