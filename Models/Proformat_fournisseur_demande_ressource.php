<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proformat_fournisseur_demande_ressource extends Model
{
    use HasFactory;
    protected $table = 'proformat_fournisseur_demande_ressource';
    public $timestamps = false;
    public $incrementing = false;
}
