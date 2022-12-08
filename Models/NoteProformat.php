<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoteProformat extends Model
{
    use HasFactory;
    protected $table = 'noteproformat';
    public $timestamps = false;
    public $incrementing = false;
    protected $fillable = [
        'note',
        'iddetailsproformat',
        'idproformat'
    ];
}
