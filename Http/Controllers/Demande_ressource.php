<?php

namespace App\Http\Controllers;

use App\Models\Colis_dispatcher;
use App\Models\Demande_ressource as ModelsDemande_ressource;
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
    public function demandes_ressources_non_livrer()
    {
        $demandes_ressources_non_livrer = ModelsDemande_ressource::where('etat', '0')->get();
        return $demandes_ressources_non_livrer;
    }


    public function dispatcher()
    {
       (new Colis_dispatcher())->dispatcher();
        return array("etat"=>true);
    }
}
