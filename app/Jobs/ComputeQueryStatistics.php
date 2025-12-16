<?php

namespace App\Jobs;

use App\Models\Query;
use App\Models\QueryStatistic;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ComputeQueryStatistics implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute query computations
     */
    public function handle(Query $queryModel, QueryStatistic $statisticModel): void
    {
        $now = now();
        Log::info('Running ComputeQueryStatistics job...');
        $totalQueries = $queryModel->count();

        if ($totalQueries === 0) {
            $this->logStatistic($now, $statisticModel);

            return;
        }

        // preferring raw sql to avoid bringing large datasets into PHP memory
        $generalStats = $queryModel->select(
            DB::raw('COUNT(*) as total_queries'),
            DB::raw('COUNT(CASE WHEN served_from_cache = true THEN 1 END) as total_cached_queries'),
            DB::raw('AVG(duration_ms) as average_duration_ms')
        )->first();

        $totalCachedQueries = $generalStats->total_cached_queries;
        $averageDuration = $generalStats->average_duration_ms;

        $topFiveQueriesRaw = $queryModel->select('query_string', DB::raw('COUNT(*) as count'))
            ->groupBy('query_string')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        $topFiveQueries = $topFiveQueriesRaw->map(function ($item) use ($totalQueries) {
            $percentage = $item->count > 0 ? round(($item->count / $totalQueries) * 100, 2) : 0;

            return ['query' => $item->query_string, 'count' => (int) $item->count, 'percentage' => $percentage];
        })->all();

        $mostPopularHour = $queryModel->select(DB::raw('EXTRACT(HOUR FROM created_at) as hour'))
            ->groupBy('hour')
            ->orderByDesc(DB::raw('COUNT(*)'))
            ->limit(1)
            ->value('hour');

        $this->logStatistic(
            $now,
            $statisticModel,
            $totalQueries,
            $totalCachedQueries,
            $averageDuration,
            $topFiveQueries,
            $mostPopularHour
        );
    }

    /**
     * Helper to write the aggregated data to the DB
     */
    protected function logStatistic(
        Carbon $calculatedAt,
        QueryStatistic $statisticModel,
        int $totalQueries = 0,
        int $totalCachedQueries = 0,
        float $averageDuration = 0,
        array $topFiveQueries = [],
        ?int $mostPopularHour = null,
    ): void {
        Log::debug("Initializing with: {$calculatedAt} {$totalQueries} {$totalCachedQueries} {$averageDuration} {$mostPopularHour}", $topFiveQueries);

        $statisticModel->create([
            'total_queries' => $totalQueries,
            'total_cached_queries' => $totalCachedQueries,
            'average_duration_ms' => number_format($averageDuration, 2, '.', ''),
            'top_five_queries' => $topFiveQueries, // model will cast it to JSON
            'most_popular_hour' => $mostPopularHour,
            'calculated_at' => $calculatedAt,
        ]);
    }
}
