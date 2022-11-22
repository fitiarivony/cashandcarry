<?php

namespace App\Http\Controllers;

use App\Models\Achattype;
use Illuminate\Http\Request;

class Achattype_controller extends Controller
{
    public function newAchattype(Request $request)
    {
        $achattype = new Achattype;
        $achattype->idachattype = $request->input('idachattype');
        $achattype->nomachattype = $request->input('nomachattype');
        $achattype->save();
        return view('ping',['titre' => 'ok']);
    }

    public function list(){
        return Achattype::all();
    }
}
