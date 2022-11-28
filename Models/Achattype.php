<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Achattype extends Model
{
    // use HasFactory;
    protected $table='achattype';
    protected $fillable = ['nomachattype'];
}
