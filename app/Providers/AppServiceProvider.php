<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Redirect storage to /tmp on Vercel (read-only filesystem)
        if (isset($_ENV['VERCEL']) || getenv('VERCEL')) {
            $this->app->useStoragePath('/tmp/storage');
        }
    }

    protected function forceHttps(): void
    {
        // Force HTTPS on Vercel to prevent mixed content errors
        if (isset($_ENV['VERCEL']) || getenv('VERCEL')) {
            URL::forceScheme('https');
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->forceHttps();
        $this->configureDefaults();
        $this->configureDatabase();
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }

    /**
     * Parse Vercel Postgres DATABASE_URL if set.
     */
    protected function configureDatabase(): void
    {
        // Vercel Postgres provides POSTGRES_URL — parse it into config
        $databaseUrl = env('POSTGRES_URL') ?? env('DATABASE_URL');

        if ($databaseUrl && config('database.default') === 'pgsql') {
            $parsed = parse_url($databaseUrl);
            if ($parsed) {
                config([
                    'database.connections.pgsql.host'     => $parsed['host'] ?? '127.0.0.1',
                    'database.connections.pgsql.port'     => $parsed['port'] ?? 5432,
                    'database.connections.pgsql.database' => ltrim($parsed['path'] ?? '/laravel', '/'),
                    'database.connections.pgsql.username' => $parsed['user'] ?? 'postgres',
                    'database.connections.pgsql.password' => $parsed['pass'] ?? '',
                    'database.connections.pgsql.sslmode'  => 'require',
                ]);
            }
        }
    }
}

