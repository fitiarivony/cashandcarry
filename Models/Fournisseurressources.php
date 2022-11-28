<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fournisseurressources extends Model
{
    use HasFactory;

    protected $table = 'fournisseurressource';
    public $timestamps = false;
    public $incrementing = false;
    // protected $fillable = [
    //     'idressource',
    //     'idfournisseur',
    // ];
}
