<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proformat_fournisseur_demande extends Model
{
    use HasFactory;
    protected $table = 'proformat_fournisseur_demande';
    public $timestamps = false;
    public $incrementing = false;
}
