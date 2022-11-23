<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProformatRecu extends Model
{
    // use HasFactory;
    public $timestamps = false;
    protected $table='proformat_fournisseur';
    protected $fillable =['idfournisseur',
    'idreferencedemande','quantite',
    'qualite','delailivraison',
    'lieulivraison','pu','daty'];
}
