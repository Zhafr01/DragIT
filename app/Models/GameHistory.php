<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameHistory extends Model
{
    protected $table = 'game_history';

    protected $fillable = [
        'user_id', 'level_id', 'score', 'time_taken', 'total_items',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
