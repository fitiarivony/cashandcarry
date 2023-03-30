<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mouvement_stock extends Model
{
  //  use HasFactory;
    protected $table = 'mouvement_stock';
    public $timestamps = false;
    public $incrementing = false;
    protected $fillable = ['idressource','quantite','pu'];

}
