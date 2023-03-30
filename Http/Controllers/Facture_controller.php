<?php

namespace App\Http\Controllers;

use App\Models\BonCommande;
use App\Models\Facture;
use App\Models\Fournisseurs;
use App\Models\Proformat_fournisseur_detail;
use App\Models\Societe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class Facture_controller extends Controller
{

   
    function test(Request $request){

        $ret = $this->save( $request->query->all()['idboncommande']);
        if($ret){

            (new Facture())->topdf();
            // echo "marina";
        }
        else {
            $deja_inseret = $this->verif_facture_deja_present($request->query->all()['idboncommande']);
            if($deja_inseret){
                // header("application/json");
                (new Facture())->topdf();
            }
            else {
                // header("application/pdf");
                return response( json_encode(array("etat"=>false)))->header('Content-Type', "application/json");

            // echo "diso";
        }
    }
}

    function verifentana($idboncommande){
        $ret = false;
        $requete = "select * from commanderesume where idboncommande = '".$idboncommande."'";
        //  echo $requete;
        $fetch = DB::select($requete);
        foreach ($fetch as $fe) {
            $idressource = $fe->idressource;
            $quantite = $fe->quantite;
            $ret = $this->check($idboncommande,$quantite,$idressource);
            if ($ret == false) {
                break;
            }
        }

        return $ret;
    }

    function check($idboncommande,$idquantite,$idressource){
        $requete = "select sum(quantite) from bonreception_detail where idboncommande = '".$idboncommande."' and idressource = '".$idressource."'";
        // echo $requete;
        $fetch = DB::select($requete);
        $quantite = 0;
        foreach ($fetch as $fe) {
            $quantite = $fe->sum;
        }
        // echo $idquantite."   ".$quantite;
        if ($idquantite == $quantite) {
            return true;
        }
        else {
            return false;
        }
    }


    public function save($idboncommande)
    {
        $ret = $this->verifentana($idboncommande);
        $deja_inseret = $this->verif_facture_deja_present($idboncommande);

        if($ret && !$deja_inseret){
            $admindept = new Facture();
            $admindept->idboncommande = $idboncommande;
            $ret = $admindept->save();
            BonCommande::where('idboncommande',$idboncommande)
            ->update(['etat' => 1]);
        }
        else {
            $ret = false;
        }
        return $ret;
    }

    public function verif_facture_deja_present($idboncommande){
        $requete = "select * from facture where idboncommande = '".$idboncommande."'";
        // echo $requete;
        $fetch = DB::select($requete);

        $quantite = 0;
        foreach ($fetch as $fe) {
            $quantite++;
        }
        if ($quantite==0) {
            return false;
        }
        else {
            return true;
        }
    }
}
