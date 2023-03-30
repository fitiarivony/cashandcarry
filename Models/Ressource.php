<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ressource extends Model
{
   use HasFactory;
  public $timestamps = false;
  protected $table='ressource';
  public $incrementing = false;
  protected $fillable = ['intitule','idachattype','code','idnature'];

}
