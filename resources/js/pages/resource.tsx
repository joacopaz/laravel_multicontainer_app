import { PersonMetadata, SharedData } from '@/types';
import Button from '@/ui/button';
import Card from '@/ui/card';
import Divider from '@/ui/divider';
import { Link, router } from '@inertiajs/react';
import { Fragment } from 'react/jsx-runtime';

export default function Resource({ metadata }: SharedData) {
    const isPerson = isPersonMetadata(metadata);
    const iterableAppearances = isPersonMetadata(metadata) ? metadata.properties.films : metadata.properties.characters;

    return (
        <div className="flex max-h-[calc(100vh-115px)] justify-center gap-[30px]">
            <Card className="max-h-max min-h-[417px] w-full max-w-[810px] gap-[30px]">
                {<h2>{isPerson ? metadata.properties.name : metadata.properties.title}</h2>}
                <div className="flex justify-between gap-[100px] leading-4">
                    <div className="flex w-[50%] flex-col">
                        <h3 className="mb-2.5">{isPerson ? 'Details' : 'Opening Crawl'}</h3>
                        <Divider />
                        {isPerson ? (
                            <>
                                <span className="mt-[5px] text-[14px]">Birth Year: {metadata.properties.birth_year}</span>
                                <span className="text-[14px]">Gender: {metadata.properties.gender}</span>
                                <span className="text-[14px]">Eye Color: {metadata.properties.eye_color}</span>
                                <span className="text-[14px]">Hair Color: {metadata.properties.hair_color}</span>
                                <span className="text-[14px]">Height: {metadata.properties.height}</span>
                                <span className="text-[14px]">Mass: {metadata.properties.mass}</span>
                            </>
                        ) : (
                            <p className="mt-[5px] text-[14px] whitespace-pre-line">{metadata.properties.opening_crawl}</p>
                        )}
                    </div>
                    <div className="flex w-[50%] flex-col">
                        <h3 className="mb-2.5">{isPerson ? 'Movies' : 'Characters'}</h3>
                        <Divider />
                        <p className="mt-[5px]">
                            {iterableAppearances.map((appearance, index) => {
                                const isLastIndex = iterableAppearances.length - 1 === index;

                                return (
                                    <Fragment key={`${appearance.name}-${appearance.url}`}>
                                        <Link href={appearance.url} className="text-[14px] text-[#0094ff] hover:underline">
                                            {appearance.name}
                                        </Link>
                                        {!isLastIndex && <span className="text-[14px]">, </span>}
                                    </Fragment>
                                );
                            })}
                        </p>
                    </div>
                </div>

                <Button label="back to search" className="mt-auto max-w-[187px]" onClick={() => router.visit('/')} />
            </Card>
        </div>
    );
}

const isPersonMetadata = (metadata: SharedData['metadata']): metadata is PersonMetadata => 'name' in metadata.properties;
