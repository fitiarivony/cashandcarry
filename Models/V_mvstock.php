<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class V_mvstock extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $table = 'v_mvstock';
    public $incrementing = false;
}

