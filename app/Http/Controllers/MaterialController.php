<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AppContent;

class MaterialController extends Controller
{
    public function getMaterials()
    {
        $content = AppContent::where('key', 'materials')->first();
        return response()->json([
            'chapters' => $content ? $content->value : []
        ]);
    }

    public function getEvaluations()
    {
        $content = AppContent::where('key', 'evaluations')->first();
        return response()->json([
            'evaluations' => $content ? $content->value : []
        ]);
    }

    public function getQuestions()
    {
        $content = AppContent::where('key', 'questions')->first();
        return response()->json([
            'levels' => $content ? $content->value : []
        ]);
    }

    public function updateMaterials(Request $request)
    {
        $request->validate([
            'chapters' => 'required|array',
        ]);

        AppContent::updateOrCreate(
            ['key' => 'materials'],
            ['value' => $request->chapters]
        );

        return response()->json([
            'message' => 'Materi berhasil disimpan!',
        ]);
    }

    public function updateEvaluations(Request $request)
    {
        $request->validate([
            'evaluations' => 'required|array',
        ]);

        AppContent::updateOrCreate(
            ['key' => 'evaluations'],
            ['value' => $request->evaluations]
        );

        return response()->json([
            'message' => 'Evaluasi berhasil disimpan!',
        ]);
    }
}
