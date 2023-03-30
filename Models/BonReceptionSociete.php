<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BonReceptionSociete extends Model
{
    use HasFactory;
    protected $table = 'bonreception_societe';
    public $timestamps = false;
    public $incrementing = false;
}
