<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'groom_name',
        'bride_name',
        'event_date',
        'event_time',
        'location_name',
        'location_map_url',
    ];
}
