<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $table = 'produit';
    public $timestamps = false;
    public $incrementing = false;
    // protected $fillable = [
    //     'idproduit',
    //     'idbesoin',
    //     'idressource',
    //     'qualite',
    //     'delailivraison',
    //     'lieulivraison',
    //     'prix',
    // ];
}
