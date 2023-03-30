<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nature extends Model
{
    use HasFactory;
  public $timestamps = false;
  protected $table='nature';
  public $incrementing = false;
  protected $fillable = ['nomnature'];
}
