<?php

namespace App\Http\Controllers\Api;

use App\Models\QueryStatistic;
use Illuminate\Http\JsonResponse;

class StatsController
{
    /**
     * Retrieves the latest calculated query statistics.
     */
    public function handler(): JsonResponse
    {
        $latestStats = QueryStatistic::orderByDesc('calculated_at')->first();

        if (! $latestStats) {
            return response()->json([
                'message' => 'Statistics not yet available',
                'calculated_at' => null,
            ], 200);
        }

        $formattedCalculatedAt = $latestStats->calculated_at->format('M d, Y H:i:s T');

        return response()->json([
            'status' => 'success',
            'data' => $latestStats,
            'message' => "Latest stats computed @ {$formattedCalculatedAt}",
        ]);
    }
}
