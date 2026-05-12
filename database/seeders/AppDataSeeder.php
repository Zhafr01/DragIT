<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\AppContent;

class AppDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Migrate materials
        $materialsPath = base_path('src/data/materials.json');
        if (File::exists($materialsPath)) {
            $materialsData = json_decode(File::get($materialsPath), true);
            if (isset($materialsData['chapters'])) {
                AppContent::updateOrCreate(
                    ['key' => 'materials'],
                    ['value' => $materialsData['chapters']]
                );
                $this->command->info('Materials seeded successfully.');
            }
        }

        // Migrate evaluations
        $evaluationsPath = base_path('src/data/evaluations.json');
        if (File::exists($evaluationsPath)) {
            $evaluationsData = json_decode(File::get($evaluationsPath), true);
            if (isset($evaluationsData['evaluations'])) {
                AppContent::updateOrCreate(
                    ['key' => 'evaluations'],
                    ['value' => $evaluationsData['evaluations']]
                );
                $this->command->info('Evaluations seeded successfully.');
            }
        }
        
        // Migrate questions (minigame) just in case
        $questionsPath = base_path('src/data/questions.json');
        if (File::exists($questionsPath)) {
            $questionsData = json_decode(File::get($questionsPath), true);
            if (isset($questionsData['levels'])) {
                AppContent::updateOrCreate(
                    ['key' => 'questions'],
                    ['value' => $questionsData['levels']]
                );
                $this->command->info('Questions seeded successfully.');
            }
        }
    }
}
