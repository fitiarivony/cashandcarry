<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LigneReception extends Model
{

    use HasFactory;
    protected $table = 'lignereception';
    public $timestamps = false;
    public $incrementing = false;
    protected $fillable = ['idressource','quantite'];
    public function genereLigneReception(Ligne_livraison $lignelivraison,string $idbonreception){
            $this->idbonreception = $idbonreception;
            $this->idressource=$lignelivraison->idstock;
            $this->quantite=$lignelivraison->quantite;

    }
}
