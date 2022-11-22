<?php

namespace App\Http\Controllers;

use App\Models\Admindept;
use Illuminate\Http\Request;

class Admindept_controller extends Controller
{
    public function newAdmindept(Request $request)
    {
        $admindept = new Admindept;
        $admindept->idadmin = $request->input('idadmin');
        $admindept->identifiant = $request->input('identifiant');
        $admindept->mdp = $request->input('mdp');
        $admindept->iddept = $request->input('iddept');
        $admindept->save();
        return view('ping',['titre' => 'ok']);
    }
    public function list(){
        return Admindept::all();
    }
}
