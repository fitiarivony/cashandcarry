<?php

namespace App\Stock;

use App\Models\Active_stock;
use App\Models\Active_stock_fournisseur;
use App\Models\Cmup_stock_fournisseur;
use App\Models\Mouvement_stock;
use App\Models\Ressource;
use App\Models\Nature;
use App\Models\Stock_fournisseur;

class Stockfournisseur
{
    public $nomtable="stock_fournisseur";
    public $idressource="";
    public $quantite=0;
    public $pu=0;
    public $ressource;
    public $fournisseur;

    public function updateStock()
    {
        if ($this->quantite<0)$this->getType();
        if ($this->quantite >0)$this->insertStock();
    }
    public function insertStock(){
        $movement=array();
        $movement['idressource']=$this->idressource;
        $movement['quantite']=$this->quantite;
        $movement['pu']=$this->pu;
        $movement['idfournisseur']=$this->idfournisseur;
       (new Stock_fournisseur())::create($movement);
    }
    public function getType(){
        $ressource=(new Ressource())->where('idressource',$this->idressource)->get()->first();
        $nature=(new Nature())->where('idnature',$ressource->idnature)->get()->first();
        if ($nature->nomnature=="LIFO") {
            echo "LIFO \n";
            $mouvement=(new Active_stock_fournisseur())
            ->where('idressource',$this->idressource)
            ->where('idfournisseur',$this->idfournisseur)->orderByDesc('datesortie')->get();
            $this->move($mouvement);

        }
        if ($nature->nomnature=="FIFO") {
            echo "FIFO \n";
            $mouvement=(new Active_stock_fournisseur())->where('idressource',$this->idressource)
            ->where('idfournisseur',$this->idfournisseur)->orderBy('datesortie')->get();
            $this->move($mouvement);
        }
        if ($nature->nomnature=="CMUP") {
            echo "CMUP \n";
            $this->CMUP();
        }
    }

    public function CMUP()
    {
        $mouvement=(new Cmup_stock_fournisseur())
        ->where('idressource',$this->idressource)
        ->where('idfournisseur',$this->idfournisseur)
        ->get()->first();
        $cmup=$mouvement->totalmontant/$mouvement->totalquantite;
        $movement=array();
        $movement['idressource']=$this->idressource;
        $movement['pu']=$cmup;
        $movement['quantite']=$this->quantite;
        $movement['idfournisseur']=$this->idfournisseur;
        (new Stock_fournisseur())::create($movement);
        return true;
    }

    public  function move($mouvement){
      $milaalaina=abs($this->quantite);
      $nyefaazo=0;
            foreach ($mouvement as $key => $value) {
                $movement=array();
                $movement['idressource']=$this->idressource;
                $movement['pu']=$value->pu;
                $movement['quantite']=-$value->quantite;
                $movement['idfournisseur']=$this->idfournisseur;
                $nyefaazo+=$value->quantite;
                if($nyefaazo>$milaalaina){
                    $nyefaazo-=$value->quantite;
                    $reste=$milaalaina-$nyefaazo;
                    $movement['quantite']=-$reste;
                    $nyefaazo=$milaalaina;
                }
                (new Stock_fournisseur())::create($movement);
                if($nyefaazo==$milaalaina){
                    return true;
                }

            }
    }

    public function __construct($idressource,$quantite,$pu=0,$idfournisseur,$nomtable="stock_fournisseur") {
        $this->nomtable=$nomtable;
        $this->idressource=$idressource;
        $this->quantite=$quantite;
        $this->pu=$pu;
        $this->idfournisseur = $idfournisseur;
        $this->ressource=(new Ressource())->where('idressource',$this->idressource)->get()->first();
    }


}
?>
