<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Query extends Model
{
    public $timestamps = false;

    const string CREATED_AT = 'created_at';

    protected $fillable = [
        'query_string',
        'resource_type',
        'duration_ms',
        'served_from_cache',
        'created_at',
    ];
}
