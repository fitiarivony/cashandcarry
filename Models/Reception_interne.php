<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reception_interne extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table='reception_interne';
    public $incrementing = false;
    protected $fillable = ['quantite','idlignereception','iddept'];
}
