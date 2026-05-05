<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class MaterialController extends Controller
{
    public function updateMaterials(Request $request)
    {
        $request->validate([
            'chapters' => 'required|array',
        ]);

        $filePath = base_path('src/data/materials.json');
        
        $data = [
            'chapters' => $request->chapters,
        ];

        // Ensure directory exists if needed (it should already)
        File::ensureDirectoryExists(dirname($filePath));

        // Write the JSON back to the file
        File::put($filePath, json_encode($data, JSON_PRETTY_PRINT));

        return response()->json([
            'message' => 'Materi berhasil disimpan!',
        ]);
    }
    public function updateEvaluations(Request $request)
    {
        $request->validate([
            'evaluations' => 'required|array',
        ]);

        $filePath = base_path('src/data/evaluations.json');
        
        $data = [
            'evaluations' => $request->evaluations,
        ];

        File::ensureDirectoryExists(dirname($filePath));
        File::put($filePath, json_encode($data, JSON_PRETTY_PRINT));

        return response()->json([
            'message' => 'Evaluasi berhasil disimpan!',
        ]);
    }
}
