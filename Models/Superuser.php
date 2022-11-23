<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Superuser extends Model
{
    public $timestamps = false;
    protected $table='superuser';
    // use HasFactory;
    protected $fillable = ['identifiant','mdp'];
}
