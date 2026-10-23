<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Akun Admin
        User::updateOrCreate(
            ['email' => 'admin@dragit.com'],
            [
                'full_name' => 'Administrator',
                'password'  => bcrypt('admin123'),
                'role'      => 'admin',
                'kelas'     => null,
            ]
        );

        // Akun Siswa
        User::updateOrCreate(
            ['email' => 'siswa@dragit.com'],
            [
                'full_name' => 'Siswa Demo',
                'password'  => bcrypt('siswa123'),
                'role'      => 'siswa',
                'kelas'     => '7A',
            ]
        );

        $this->call(AppDataSeeder::class);
    }
}
