<?php

namespace App\Http\Controllers;

use App\Models\Fournisseurs;
use App\Models\Proformat_envoye;
use App\Models\Proformat_fournisseur;
use App\Models\Proformat_fournisseur_demande;
use App\Models\Proformat_fournisseur_detail;
use App\Models\Ressource;
use App\Models\Triage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Proformat_fournisseur_controller extends Controller
{
    public function newProformat_fournisseur(Request $request)
    {
        $Demande_ressource = new Proformat_fournisseur;
        $Demande_ressource->id = $request->input('id');
        $Demande_ressource->idproformat_fournisseur = $request->input('idproformat_fournisseur');
        $Demande_ressource->idfournisseur = $request->input('idfournisseur');
        $Demande_ressource->idreferencedemande = $request->input('idreferencedemande');
        $Demande_ressource->qualite = $request->input('qualite');
        $Demande_ressource->quantite = $request->input('quantite');
        $Demande_ressource->delailivraison = $request->input('delailivraison');
        $Demande_ressource->lieulivraison = $request->input('lieulivraison');
        $Demande_ressource->save();
        return "insert";
    }

    public function list(){
        return Proformat_fournisseur::all();
    }

    public function proformatsfournisseurs_idreferencedemande(String $idreferencedemande){
        //$proformatsfournisseurs = DB::select("select * from proformat_fournisseur where idreferencedemande = '.$idreferencedemande.'");
        //return $proformatsfournisseurs;

        $proformatsfournisseurs = Proformat_fournisseur::where('idreferencedemande', $idreferencedemande)->get();
        return $proformatsfournisseurs;
    }
    public function orderMoinsDisant(Request $request){
        $parameters=$request->query->all()["data"];
        $parameters=json_decode($parameters,true);
        $proformatsfournisseurs=(new Proformat_fournisseur_detail())
        ->join("ressource","ressource.idressource","proformat_fournisseur_detail.idressource")
        ->where('proformat_fournisseur_detail.idressource',$parameters['idressource'])
        ->get();
        $triage=(new Triage())->where('idressource',$parameters['idressource'])->get()->first();
        $array=array();
        array_push($array,$proformatsfournisseurs);
        array_push($array,$triage);
        return json_encode(array("etat"=>true,"data"=>$array));
    }
    public function getRessource() {
        $query=(new Triage())->all();
    //
        return  json_encode(array("etat"=>true,"data"=>$query));
    }





    public function getProformat_fournisseur(Request $request){
        $parameters=$request->query->all()["data"];
        $parameters=json_decode($parameters,true);
        $proformatsfournisseurs=(new Proformat_fournisseur_detail())
        ->join("ressource","ressource.idressource","proformat_fournisseur_detail.idressource")
        ->where('idfournisseur',$parameters['idfournisseur'])
        ->get();
        return $proformatsfournisseurs;
    }
    public function getFournisseurs() {
        $query=(new Proformat_fournisseur_demande()) ->select('idfournisseur')->distinct()->where('etat',0);
       $query=$query->get();
       $array=array();
       foreach ($query as $key => $value) {
        array_push($array,(new Fournisseurs())->where('idfournisseur',$value['idfournisseur'])->get()->first());
       }
        return  json_encode(array("etat"=>true,"data"=>$array));
    }


    public function getNonInserer(Request $request)
    {
        $parameters=$request->query->all()["data"];
        $parameters=json_decode($parameters,true);
        $valeurs=Proformat_envoye::whereNotIn('idprenvoye', function($query) {
            $query->select('idreferencedemande')->from('proformat_fournisseur');
            })->where('idfournisseur',$parameters['idfournisseur'])->get();
            if (count($valeurs)!=0) {
                return json_encode(array("etat"=>true,"data"=>$valeurs));
            }else{
                return json_encode(array("etat"=>false));
            }

    }

    // public function proformatsfournisseurs_iddemande(String $iddemande){
    //     $proformatsfournisseurs = DB::select("select * from proformat_fournisseur where idreferencedemande = '.$iddemande.'");
    //     return view('user.index', ['demande' => $proformatsfournisseurs]);
    // }
}
