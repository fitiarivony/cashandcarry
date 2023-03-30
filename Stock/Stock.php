<?php

namespace App\Stock;

use App\Models\Active_stock;
use App\Models\CMUP_stock;
use App\Models\Mouvement_stock;
use App\Models\Ressource;
use App\Models\Nature;
class Stock
{
    public $nomtable="mouvement_stock";
    public $idressource="";
    public $quantite=0;
    public $pu=0;
    public $ressource;

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
       (new Mouvement_stock)::create($movement);
    }
    public function getType(){
        $ressource=(new Ressource())->where('idressource',$this->idressource)->get()->first();
        $nature=(new Nature())->where('idnature',$ressource->idnature)->get()->first();
        if ($nature->nomnature=="LIFO") {
            echo "LIFO \n";
            $mouvement=(new Active_stock())->where('idressource',$this->idressource)->orderByDesc('datesortie')->get();
            $this->move($mouvement);

        }
        if ($nature->nomnature=="FIFO") {
            echo "FIFO \n";
            $mouvement=(new Active_stock())->where('idressource',$this->idressource)->orderBy('datesortie')->get();
            $this->move($mouvement);
        }
        if ($nature->nomnature=="CMUP") {
            echo "CMUP \n";
            $this->CMUP();
        }
    }

    public function CMUP()
    {
        $mouvement=(new CMUP_stock())->where('idressource',$this->idressource)->get()->first();
        $cmup=$mouvement->totalmontant/$mouvement->totalquantite;
        $movement=array();
        $movement['idressource']=$this->idressource;
        $movement['pu']=$cmup;
        $movement['quantite']=$this->quantite;
        (new Mouvement_stock())::create($movement);
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
                $nyefaazo+=$value->quantite;
                if($nyefaazo>$milaalaina){
                    $nyefaazo-=$value->quantite;
                    $reste=$milaalaina-$nyefaazo;
                    $movement['quantite']=-$reste;
                    $nyefaazo=$milaalaina;
                }
                (new Mouvement_stock())::create($movement);
                if($nyefaazo==$milaalaina){
                    return true;
                }

            }
    }

    public function __construct($idressource,$quantite,$pu=0,$nomtable="mouvement_stock") {
        $this->nomtable=$nomtable;
        $this->idressource=$idressource;
        $this->quantite=$quantite;
        $this->pu=$pu;
        $this->ressource=(new Ressource())->where('idressource',$this->idressource)->get()->first();
    }


}
?>
