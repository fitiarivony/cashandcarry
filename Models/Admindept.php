<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admindept extends Model
{
    use HasFactory;

    protected $table = 'admindept';
    public $timestamps = false;
    public $incrementing = false;
    // protected $fillable = [
    //     'idadmin',
    //     'identifiant',
    //     'mdp',
    //     'iddept',
    // ];
}
