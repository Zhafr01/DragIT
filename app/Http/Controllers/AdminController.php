<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Progress;
use App\Models\GameHistory;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // GET /api/admin/dashboard
    public function getDashboard()
    {
        $students = User::where('role', 'siswa')
            ->with(['progress', 'gameHistory'])
            ->get()
            ->map(fn($u) => [
                'id' => $u->id,
                'name' => $u->full_name,
                'email' => $u->email,
                'avatar' => $u->avatar,
                'kelas' => $u->kelas,
                'xp' => $u->progress->xp ?? 0,
                'level' => $u->progress->level ?? 1,
                'gameCount' => $u->gameHistory->count(),
            ]);

        $totalXP = $students->sum('xp');

        $laporan = GameHistory::with('user')
            ->orderBy('created_at', 'desc')
            ->take(20)
            ->get()
            ->map(fn($g) => [
                'id' => $g->id,
                'levelId' => $g->level_id,
                'score' => $g->score,
                'total' => $g->total_items,
                'timeTaken' => $g->time_taken,
                'date' => $g->created_at,
                'student' => [
                    'id' => $g->user->id ?? 0,
                    'name' => $g->user->full_name ?? 'Unknown',
                    'avatar' => $g->user->avatar ?? '👤',
                ]
            ]);

        return response()->json([
            'students' => $students,
            'totalXP' => $totalXP,
            'laporan' => $laporan,
        ]);
    }
}
