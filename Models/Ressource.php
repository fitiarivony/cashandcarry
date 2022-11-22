<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ressource extends Model
{
    use HasFactory;

    protected $table = 'ressource';
    public $timestamps = false;
    public $incrementing = false;
    // protected $fillable = [
    //     'idressource',
    //     'nomressource',
    //     'idachattype',
    // ];
}
