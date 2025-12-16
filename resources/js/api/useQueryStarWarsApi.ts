import type { MovieQueryResponse, PersonQueryResponse, SelectionState } from '@/types';
import { useQuery } from '@tanstack/react-query';

type StarWarsQueryParams = {
    type: SelectionState;
    query: string;
};

const apiVersion = import.meta.env.API_VERSION || 'v1';

async function fetchStarWarsApi({ type, query }: StarWarsQueryParams): Promise<{ data: PersonQueryResponse[] | MovieQueryResponse[] }> {
    const params = new URLSearchParams({
        type,
        query,
    });

    const res = await fetch(`/api/${apiVersion}/star-wars?${params.toString()}`, {
        headers: {
            Accept: 'application/json',
        },
    });

    if (!res.ok) {
        const body = await res.json().catch(/* intentionally empty, swallow if body is not parsable */);
        throw new Error(body?.message ?? 'Failed to fetch Star Wars data');
    }

    return res.json();
}

export default function useQueryStarWarsApi({ type, query }: StarWarsQueryParams) {
    return useQuery({
        queryKey: ['star-wars', type, query] as const,
        queryFn: () => fetchStarWarsApi({ type, query }),
        enabled: false, // will be manually triggered with refetch
        select: ({ data }) => data,
    });
}
