<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ligne_livraison extends Model
{
    use HasFactory;
    protected $table = 'detaillivraison';
    public $timestamps = false;
    public $incrementing = false;
   
}
