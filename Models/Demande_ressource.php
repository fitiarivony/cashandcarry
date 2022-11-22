<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demande_ressource extends Model
{
    use HasFactory;
    protected $table = 'demande_ressource';
    public $timestamps = false;
    public $incrementing = false;
}
