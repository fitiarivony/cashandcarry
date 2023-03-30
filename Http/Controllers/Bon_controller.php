<?php

namespace App\Http\Controllers;

use App\Models\Proformat_fournisseur_detail;
use App\Models\Societe;
use App\Models\BonLivraison;

use Codedge\Fpdf\Fpdf\Fpdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Bon_controller extends Controller
{

    function test(Request $request){
        $content=$request->getContent();
        $data=json_decode($content,true);

        $idboncommande = $data['idboncommande'];
        $ret = $this->insert_bonlivraison($idboncommande,$data['data']);
        // echo $ret;
    }

    function insert_bonlivraison($idboncommande,array $alivre/* alivre[idressource][quantite] */){
        $return = 0;
        $checkFournisseur = $this->checkFournisseur($idboncommande,$alivre);
        for ($i=0; $i < count($alivre); $i++) {
            $val = $this->check($alivre[$i]["idressource"],$alivre[$i]["quantite"],$idboncommande);
            if ($val == false) {
                $return = 1;
            }
        }

        if($return == 0 && $checkFournisseur){
            $idlivraison = $this->saveBonlivraison($idboncommande);
            if ($idlivraison != null) {
                for ($i=0; $i < count($alivre); $i++) {
                $this->insert_detail($idlivraison,$alivre[$i]["idressource"],$alivre[$i]["quantite"]);
                }
            }
        }
        (new BonLivraison())->topdf();
    }

    function insert_detail($idlivraison,$idstock,$quantite){
        $requete3 = "insert into detaillivraison (idlivraison,idstock,quantite) values ('".$idlivraison."','".$idstock."','".$quantite."')";
        // echo $requete3;
        DB::insert($requete3);
    }

    function saveBonlivraison($idboncommande){
        $requete = "insert into bonlivraison (idboncommande) values ('".$idboncommande."')";
        // echo $requete;
        DB::insert($requete);

        $requete2 = "select idlivraison from bonlivraison order by substring(idlivraison from 3) desc limit 1";
        // echo $requete2;
        $val = DB::select($requete2);
        $id = null;
        foreach ($val as $fe) {
            $id = $fe->idlivraison;
        }
        return $id;
    }

    function check($idressource,$idquantite,$idboncommande){
        $requete = "select sum(quantite) from detail_bon_with_proformat where idboncommande = '".$idboncommande."' and idressource = '".$idressource."'";
        // echo $requete;
        $fetch = DB::select($requete);
        $quantite = 0;
        foreach ($fetch as $fe) {
            $quantite = $fe->sum;
        }

        $quantite_deja_livre = $this->quantite_deja_livre($idboncommande,$idressource);
        $reste = $quantite - $quantite_deja_livre;

        // echo $reste;

        if ($idquantite > $reste || $idquantite <= 0 ) {
            return false;
        }
        else {
            return true;
        }
    }

    function quantite_deja_livre($idboncommande,$idressource){
        $sql="select sum(quantite) from detaillivraison left join bonlivraison on detaillivraison.idlivraison = bonlivraison.idlivraison where idboncommande = '".$idboncommande."' and idstock='".$idressource."'";
        $fetch = DB::select($sql);
        $quantite = 0;
        // echo $sql;
        foreach ($fetch as $fe) {
            $quantite = $fe->sum;
        }
        return $quantite;
    }

    function checkFournisseur($idboncommande,array $alivre/* alivre[idressource][quantite] */){
        $return = true;

        for ($i=0; $i < count($alivre); $i++) {
            $return = $this->checkfour($alivre[$i]["idressource"],$alivre[$i]["quantite"],$idboncommande);
            if ($return == false) {
                break;
            }
        }
        return $return;
    }
    function checkfour($idressource,$idquantite,$idboncommande){
        $requete = "select sum(quantite) from detail_bon_with_proformat where idboncommande = '".$idboncommande."' and idressource = '".$idressource."'";
        $fetch = DB::select($requete);
        $quantite = 0;
        foreach ($fetch as $fe) {
            $quantite = $fe->sum;
        }
        $quantite_deja_livre = $this->quantite_deja_livre($idboncommande,$idressource);
        $reste = $quantite - $quantite_deja_livre;
        if ($idquantite > $reste || $idquantite <= 0 ) {
            return false;
        }
        else {
            return true;
        }
    }


}
