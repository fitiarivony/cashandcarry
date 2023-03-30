<?php

namespace App\Models;

use App\Models\Demande_ressource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Colis_dispatcher extends Model
{
    use HasFactory;
    protected $table = 'colis_dispatcher';
    public $timestamps = false;
    public $incrementing = false;
    public function dispatcher()
    {
       $colis=(new Colis_dispatcher())->all();
       foreach ($colis as $key => $coli) {
            $coli->dispatch();
            $coli->updateDemande();
       }
    }
    public function updateDemande()
    {
        $demande_ressource=(new Demande_ressource())
        ->where('iddemande_ressource',$this->iddemande_ressource)->get()->first();
        Demande_ressource::where('iddemande_ressource',$this->iddemande_ressource)
        ->update(['dejarecu'=>round(($this->pourcentage*$this->quantite)/100)+$demande_ressource->dejarecu]);
        if($demande_ressource->quantite==$demande_ressource->dejarecu){
            Demande_ressource::where('iddemande_ressource',$this->iddemande_ressource)
            ->update(['etat'=>1]);
        }
    }
    public function dispatch(){
        $reception=new Reception_interne();
        $reception->quantite=round(($this->pourcentage*$this->quantite)/100);
        $reception->idlignereception=$this->idlignereception;
        $demande_ressource=(new Demande_ressource())
        ->where('iddemande_ressource',$this->iddemande_ressource)->get()->first();
        $reception->iddept=$demande_ressource->iddept;
        $reception->save();
    }
}
