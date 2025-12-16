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
        Schema::create('queries', function (Blueprint $table) {
            $table->id();
            $table->timestamp('created_at');
            $table->string('query_string', 100);
            $table->string('resource_type', 20);
            $table->unsignedSmallInteger('duration_ms')->nullable();
            $table->boolean('served_from_cache')->defaults(false);
            $table->index('created_at', 'query_string');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('queries');
    }
};
