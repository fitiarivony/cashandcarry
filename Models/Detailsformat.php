<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detailsformat extends Model
{
    use HasFactory;
    protected $table = 'detailsformat';
    public $timestamps = false;
    public $incrementing = false;
    protected $fillable = [
        'intitule',
        'coeff',
    ];
}
