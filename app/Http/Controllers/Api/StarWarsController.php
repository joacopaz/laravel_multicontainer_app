<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\IncorrectSwapiResourceException;
use App\Exceptions\SwapiLookupFailedException;
use App\Services\SwApiService;
use Illuminate\Http\Request;
use RuntimeException;

class StarWarsController
{
    public function __construct(private readonly SwApiService $swApiService) {}

    /**
     * Handles the requests for new queries, interacts with external SW Api and registers metrics
     */
    public function handler(Request $request)
    {
        $validatedParams = $request->validate([
            'type' => ['required', 'string', function ($attribute, $value, $fail) {
                $allowed = ['movies', 'people'];
                if (! in_array(strtolower($value), $allowed)) {
                    $fail('The '.$attribute.' must be either "films" or "people".');
                }
            }, ],
            'query' => 'required|string|min:1|max:100',
        ], [
            'type.required' => 'The "type" parameter is mandatory.',
            'type.in' => 'The "type" must be either "films" or "people".',
            'query.required' => 'The "query" parameter is mandatory.',
        ]);

        $resourceType = $validatedParams['type'];
        $queryString = $validatedParams['query'];

        try {
            $swApiData = $this->swApiService->search($resourceType, $queryString);

            return response()->json(['data' => $swApiData]);
        } catch (IncorrectSwapiResourceException|SwapiLookupFailedException $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage(), 'code' => $e->getCode()]);
        } catch (RuntimeException $e) {
            return response()->json(['status' => 'error', 'message' => "External api is currently unreachable: {$e->getMessage()}", 'code' => $e->getCode()]);
        }

    }
}
