<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Active_stock_fournisseur extends Model
{
    use HasFactory;
    public $timestamps = false;
    public $incrementing = false;
  protected $table='active_stock_fournisseur';
}
