<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Progress extends Model
{
    protected $table = 'progress';

    protected $fillable = [
        'user_id', 'xp', 'level', 'current_chapter',
        'completed_chapters', 'completed_levels',
    ];

    protected $casts = [
        'completed_chapters' => 'array',
        'completed_levels'   => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
