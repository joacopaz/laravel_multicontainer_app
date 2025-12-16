<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('query_statistics', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('total_queries');
            $table->unsignedInteger('total_cached_queries');
            $table->decimal('average_duration_ms', 8, 2)
                ->check('average_duration_ms >= 0');
            $table->json('top_five_queries');
            $table->unsignedTinyInteger('most_popular_hour')->nullable();
            $table->timestamp('calculated_at')->unique();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('query_statistics');
    }
};
