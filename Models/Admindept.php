<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admindept extends Model
{
    // use HasFactory;
    public $timestamps = false;
  protected $table='admindept';
  protected $fillable = ['identifiant','mdp','iddept'];
}
