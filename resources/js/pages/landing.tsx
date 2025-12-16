import useQueryStarWarsApi from '@/api/useQueryStarWarsApi';
import { cn } from '@/lib/utils';
import type { MovieQueryResponse, PersonQueryResponse, SelectionState } from '@/types';
import Button from '@/ui/button';
import Card from '@/ui/card';
import Divider from '@/ui/divider';
import RadioButton from '@/ui/radio-button';
import TextInput from '@/ui/text-input';
import { router } from '@inertiajs/react';
import { Fragment, useEffect, useRef, useState } from 'react';

export default function Landing() {
    const [selectionState, setSelectionState] = useState<SelectionState>('People');
    const [queryText, setQueryText] = useState('');
    const [isResultsContainerOverflowing, setIsResultsContainerOverflowing] = useState(false);
    const resultsRef = useRef<HTMLDivElement>(null);

    const {
        data: starWarsData = [],
        refetch: performStarWarsQuery,
        isLoading: isLoadingApi,
    } = useQueryStarWarsApi({ type: selectionState, query: queryText });

    useEffect(() => {
        const resultsContainer = resultsRef.current;

        if (starWarsData.length > 0 && resultsContainer) {
            const isResultsContainerOverflowing = resultsContainer.scrollHeight > resultsContainer.clientHeight;
            // compute pr-5 when overflow to account for scroll bar
            setIsResultsContainerOverflowing(isResultsContainerOverflowing);
        }
    }, [starWarsData]);

    const placeholderText = selectionState === 'People' ? 'e.g. Chewbacca, Yoda, Boba Fett' : 'e.g. A New Hope, The Last Jedi';

    return (
        <div className="flex max-h-[calc(100vh-115px)] justify-center gap-[30px]">
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // avoid reloading
                    performStarWarsQuery();
                }}
            >
                <Card className="max-h-max min-w-[410px] gap-[20px] self-start">
                    <span className="text-sm font-semibold">What are you searching for?</span>
                    <div className="flex gap-[30px]">
                        <RadioButton label="People" selectionState={selectionState} setSelectionState={setSelectionState} />
                        <RadioButton label="Movies" selectionState={selectionState} setSelectionState={setSelectionState} />
                    </div>
                    <TextInput placeholder={placeholderText} value={queryText} setValue={setQueryText} />
                    <Button label={isLoadingApi ? 'searching...' : 'search'} isDisabled={!queryText || isLoadingApi} type="submit" />
                </Card>
            </form>

            <Card className="min-h-[582px] w-full max-w-[582px]">
                <div className={cn(isResultsContainerOverflowing && 'pr-5')}>
                    <h2 className="mb-2.5">Results</h2>
                    <Divider />
                </div>
                <div className={cn('flex h-full flex-col overflow-y-auto', isResultsContainerOverflowing && 'pr-5')} ref={resultsRef}>
                    {!isLoadingApi && starWarsData.length > 0 ? (
                        starWarsData.map((result) => {
                            const { label, url, uid } = getResultMetadata(result);

                            return (
                                <Fragment key={`${label}-${uid}`}>
                                    <div className="b-2 b-1 flex items-center justify-between py-2.5">
                                        <h3>{label}</h3>
                                        <Button label="see details" onClick={() => router.visit(url)} />
                                    </div>
                                    <Divider />
                                </Fragment>
                            );
                        })
                    ) : (
                        <div className="flex flex-grow items-center justify-center">
                            <span className="pinkish-grey-color text-center font-bold">
                                {isLoadingApi
                                    ? 'Searching...'
                                    : starWarsData.length === 0 && (
                                          <>
                                              There are zero matches.
                                              <br />
                                              Use the form to search for People or Movies.
                                          </>
                                      )}
                            </span>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}

const getResultMetadata = (result: PersonQueryResponse | MovieQueryResponse): { label: string; url: string; uid: string } => {
    const { uid, properties } = result;

    if ('name' in properties) {
        return { label: properties.name, url: `/people/${uid}`, uid };
    } else {
        return { label: properties.title, url: `/movies/${uid}`, uid };
    }
};
