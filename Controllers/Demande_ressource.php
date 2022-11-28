<?php

namespace App\Http\Controllers;

use App\Models\Ressource_detail;
use App\Models\Triage;
use Illuminate\Http\Request;

class Demande_ressource extends Controller
{
    //
    public function detailsDemande(){
        $instance=new Triage();
        $liste=$instance->all();
        foreach ($liste as $value) {
          $value["fournisseurs"]=Ressource_detail::where("idressource",$value['idressource'])->get();
        }
        return $liste;
    }
}
