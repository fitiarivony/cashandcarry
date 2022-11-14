<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Besoin extends Model
{
    use HasFactory;

    protected $fillable = [
        'idbesoin',
        'quantite',
        'iddept',
        'idressource',
    ];
}
