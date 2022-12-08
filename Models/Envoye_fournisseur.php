<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Envoye_fournisseur extends Model
{
    use HasFactory;
    protected $table = 'envoye_fournisseur';
    public $timestamps = false;
    public $incrementing = false;
}
