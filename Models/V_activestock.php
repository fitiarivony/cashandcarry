<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class V_activestock extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'v_activestock';
    public $incrementing = false;
}
