<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock_fournisseur extends Model
{
    //  use HasFactory;
    protected $table = 'stock_fournisseur';
    public $timestamps = false;
    public $incrementing = false;
    protected $fillable = ['idressource','quantite','pu','idfournisseur'];

}
