<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Stat extends Controller
{
    public function statAchatFournisseur(Request $request){
        $moi = (int)$request->input('moi');
        $annee = (int)$request->input('annee');
        $fourniseur = (String)$request->input('fournisseur');

        
// create view stat_achat as
// select idclient,idfournisseur,envoye_fournisseur.pu,envoye_fournisseur.idressource,envoye_fournisseur.quantite,facture.datefacture
// from envoye_fournisseur join lignecommande on envoye_fournisseur.idproformat_fournisseur = lignecommande.idproformat_fournisseur join facture on lignecommande.idboncommande = facture.idboncommande
// ;
        $request = "select * from stat_achat where extract(month from datefacture)='".$moi."' and extract(year from datefacture)='".$annee."' and idfournisseur='".$fourniseur."'";
        $fetch = DB::select($request);
        $cars = array ();
        foreach ($fetch as $fe) {
            $ff = array ($fe->idclient,$fe->idfournisseur,$fe->pu,$fe->idressource,$fe->quantite,$fe->datefacture);
            array_push($cars,$ff);
        }
        
        $totalprix = 0;
        for ($i=0; $i < count($cars); $i++) { 
            $totalprix += $cars[$i][2]*$cars[$i][4];
        }
        
        $tot = array("total",$totalprix);
        array_push($cars,$tot);
        return $cars;
    }

    public function statAchatClient(Request $request){
        $moi = (int)$request->input('moi');
        $annee = (int)$request->input('annee');
        $idclient = (String)$request->input('client');

        $request = "select * from stat_achat where extract(month from datefacture)='".$moi."' and extract(year from datefacture)='".$annee."' and idclient='".$idclient."'";
        $fetch = DB::select($request);
        $cars = array ();
        foreach ($fetch as $fe) {
            $ff = array ($fe->idclient,$fe->idfournisseur,$fe->pu,$fe->idressource,$fe->quantite,$fe->datefacture);
            array_push($cars,$ff);
        }
        $totalprix = 0;
        for ($i=0; $i < count($cars); $i++) { 
            $totalprix += $cars[$i][2]*$cars[$i][4];
        }

        $tot = array("total",$totalprix);
        array_push($cars,$tot);
        return $cars;
    }

    
}
