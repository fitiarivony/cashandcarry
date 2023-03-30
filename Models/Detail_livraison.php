<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detail_livraison extends Model
{
    use HasFactory;
    protected $table = 'detail_livraison';
    public $timestamps = false;
    public $incrementing = false;
    
}
