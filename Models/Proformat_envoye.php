<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proformat_envoye extends Model
{
  //  use HasFactory;
  public $timestamps = false;
  public $incrementing = false;
  protected $table='proformat_envoye';
  protected $fillable = ['reference','idressource','intitule','quantite','idfournisseur','idclient'];
}
