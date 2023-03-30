<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CMUP_stock extends Model
{
      use HasFactory;
     protected $table = 'cmup_stock';
     public $timestamps = false;
     public $incrementing = false;
}
