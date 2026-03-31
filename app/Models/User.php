<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'full_name',
        'email',
        'password',
        'role',
        'avatar',
        'kelas',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'password' => 'hashed',
    ];

    public function progress()
    {
        return $this->hasOne(Progress::class);
    }

    public function gameHistory()
    {
        return $this->hasMany(GameHistory::class);
    }
}
