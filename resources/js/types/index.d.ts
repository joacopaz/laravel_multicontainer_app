export interface SharedData {
    name: string;
    metadata: PersonMetadata | MovieMetadata;
    [key: string]: unknown;
}

export type SelectionState = 'People' | 'Movies';
export type SearchForm = { queryText: string; selectionState: SelectionState };

type UniqueEntity = {
    uid: string;
};

type ResourceShort = {
    name: string;
    url: string;
};

export type PersonQueryResponse = {
    properties: {
        name: string;
    };
} & UniqueEntity;

type PersonMetadata = {
    properties: {
        birth_year: string;
        gender: string;
        eye_color: string;
        hair_color: string;
        height: string;
        mass: string;
        films: ResourceShort[];
    };
} & PersonQueryResponse;

export type MovieQueryResponse = {
    properties: {
        title: string;
    };
} & UniqueEntity;

type MovieMetadata = {
    properties: {
        opening_crawl: string;
        characters: ResourceShort[];
    };
} & MovieQueryResponse;
