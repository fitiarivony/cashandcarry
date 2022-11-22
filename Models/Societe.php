<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Societe extends Model
{
    use HasFactory;

    protected $table = 'societe';
    public $timestamps = false;
    public $incrementing = false;
    // protected $fillable = [
    //     'idsociete',
    //     'nomsociete',
    //     'reference',
    //     'adresse',
    // ];
}
