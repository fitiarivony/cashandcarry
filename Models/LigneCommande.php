<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LigneCommande extends Model
{
    use HasFactory;
    protected $table = 'lignecommande';
    public $timestamps = false;
    public $incrementing = false;
    protected $fillable = ['idboncommande','idproformat_fournisseur','quantite'];
}
