<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Progress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:100',
            'email'     => 'required|email|unique:users,email',
            'password'  => 'required|min:6',
        ]);

        $user = User::create([
            'full_name' => $request->full_name,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
            'role'      => $request->role ?? 'siswa',
            'kelas'     => $request->kelas ?? null,
        ]);

        // Initialize progress for new user
        Progress::create([
            'user_id'             => $user->id,
            'xp'                  => 0,
            'level'               => 1,
            'current_chapter'     => 1,
            'completed_chapters'  => [],
            'completed_levels'    => [],
        ]);

        return response()->json([
            'message' => 'Registrasi berhasil!',
            'user'    => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Email atau password salah!'
            ], 401);
        }

        return response()->json([
            'message' => 'Login berhasil!',
            'user'    => $user,
        ]);
    }
}
