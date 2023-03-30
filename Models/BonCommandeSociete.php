<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BonCommandeSociete extends Model
{
    use HasFactory;
    protected $table = 'boncommande_fournisseur';
    public $timestamps = false;
    public $incrementing = false;
}
