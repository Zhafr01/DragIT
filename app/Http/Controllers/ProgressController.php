<?php

namespace App\Http\Controllers;

use App\Models\Progress;
use App\Models\GameHistory;
use App\Models\User;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    // GET /api/progress/{userId}
    public function show($userId)
    {
        if (!is_numeric($userId)) {
            return response()->json(['error' => 'Invalid User ID format'], 400);
        }

        $progress = Progress::firstOrCreate(
            ['user_id' => $userId],
            ['xp' => 0, 'level' => 1, 'current_chapter' => 1, 'completed_chapters' => [], 'completed_levels' => []]
        );

        $history = GameHistory::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($h) => [
                'levelId'    => $h->level_id,
                'score'      => $h->score,
                'timeTaken'  => $h->time_taken,
                'totalItems' => $h->total_items,
                'timestamp'  => $h->created_at,
            ]);

        return response()->json([
            'xp'                 => $progress->xp,
            'level'              => $progress->level,
            'currentChapter'     => $progress->current_chapter,
            'completedChapters'  => $progress->completed_chapters ?? [],
            'completedLevels'    => $progress->completed_levels ?? [],
            'gameHistory'        => $history,
        ]);
    }

    // POST /api/progress/{userId}/xp
    public function addXp(Request $request, $userId)
    {
        if (!is_numeric($userId)) return response()->json(['error' => 'Invalid ID'], 400);

        $request->validate(['amount' => 'required|integer|min:1']);

        $progress = Progress::firstOrCreate(['user_id' => $userId]);
        $newXp    = $progress->xp + $request->amount;
        $newLevel = (int) floor($newXp / 100) + 1;

        $progress->update(['xp' => $newXp, 'level' => $newLevel]);

        return response()->json([
            'message'  => 'XP berhasil ditambahkan',
            'newXp'    => $newXp,
            'newLevel' => $newLevel,
        ]);
    }

    // POST /api/progress/{userId}/game-result
    public function recordGameResult(Request $request, $userId)
    {
        if (!is_numeric($userId)) return response()->json(['error' => 'Invalid ID'], 400);

        $request->validate([
            'levelId'    => 'required|string',
            'score'      => 'required|integer',
            'timeTaken'  => 'required|integer',
            'totalItems' => 'required|integer',
        ]);

        GameHistory::create([
            'user_id'     => $userId,
            'level_id'    => $request->levelId,
            'score'       => $request->score,
            'time_taken'  => $request->timeTaken,
            'total_items' => $request->totalItems,
        ]);

        // Mark level complete if score >= 60%
        $pct = $request->score / max($request->totalItems * 10, 1) * 100;
        if ($pct >= 60) {
            $progress = Progress::firstOrCreate(['user_id' => $userId]);
            $completed = $progress->completed_levels ?? [];
            if (! in_array($request->levelId, $completed)) {
                $completed[] = $request->levelId;
                $progress->update(['completed_levels' => $completed]);
            }
        }

        return response()->json(['message' => 'Game result disimpan']);
    }

    // POST /api/progress/{userId}/complete-chapter
    public function completeChapter(Request $request, $userId)
    {
        if (!is_numeric($userId)) return response()->json(['error' => 'Invalid ID'], 400);

        $request->validate(['chapterId' => 'required|integer']);

        $progress = Progress::firstOrCreate(['user_id' => $userId]);
        $chapters = $progress->completed_chapters ?? [];

        if (! in_array($request->chapterId, $chapters)) {
            $chapters[] = $request->chapterId;
            $progress->update(['completed_chapters' => $chapters]);
        }

        return response()->json([
            'message'  => 'Chapter selesai dicatat',
            'chapters' => $chapters,
        ]);
    }

    // GET /api/progress/leaderboard/all
    public function leaderboard()
    {
        $rows = User::where('role', 'siswa')
            ->with('progress')
            ->get()
            ->sortByDesc(fn($u) => $u->progress->xp ?? 0)
            ->values()
            ->map(fn($u) => [
                'id'     => $u->id,
                'name'   => $u->full_name,
                'avatar' => $u->avatar,
                'kelas'  => $u->kelas,
                'xp'     => $u->progress->xp ?? 0,
                'level'  => $u->progress->level ?? 1,
            ]);

        return response()->json($rows);
    }
}
