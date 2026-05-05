<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Expand the role ENUM to include 'admin'
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('siswa', 'guru', 'admin') NOT NULL DEFAULT 'siswa'");
        
        // Migrate existing 'guru' users to 'admin'
        DB::statement("UPDATE users SET role = 'admin' WHERE role = 'guru'");
        
        // Remove 'guru' from the ENUM since it's no longer needed
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('siswa', 'admin') NOT NULL DEFAULT 'siswa'");
    }

    public function down(): void
    {
        // Restore the original ENUM
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('siswa', 'guru', 'admin') NOT NULL DEFAULT 'siswa'");
        DB::statement("UPDATE users SET role = 'guru' WHERE role = 'admin'");
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('siswa', 'guru') NOT NULL DEFAULT 'siswa'");
    }
};
