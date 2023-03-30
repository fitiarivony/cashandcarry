<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BonLivraisonSociete extends Model
{
    use HasFactory;
    protected $table = 'bonlivraison_societe';
    public $timestamps = false;
    public $incrementing = false;
}
