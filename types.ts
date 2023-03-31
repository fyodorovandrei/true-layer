export type PokemonReference = {
	name: string;
	url: string;
}

export type PokemonSpeciesRecordType = {
	name: string;
	url: string;
}

export type PokemonSpecieListReturnType = {
	count: number;
	results: PokemonSpeciesRecordType[];
}

export type PokemonLanguageType = PokemonReference
export type PokemonVersionType = PokemonLanguageType;

export type PokemonSpeciesNameType = {
	language: PokemonLanguageType;
	name: string;
}

export type PokemonSpeciesFlavorTextEntriesType = {
	flavor_text: string;
	language: PokemonLanguageType;
	version: PokemonVersionType;
}

export type PokemonSpeciesGenusType = {
	genus: string;
	language: PokemonLanguageType;
}

export type PokemonVarietiesPokemonType = PokemonReference;

export type PokemonVarietiesType = {
	is_default: boolean,
	pokemon: PokemonVarietiesPokemonType
}

export type PokemonSpeciesType = {
	id: number;
	name: string;
	names: PokemonSpeciesNameType[];
	flavor_text_entries: PokemonSpeciesFlavorTextEntriesType[];
	genera: PokemonSpeciesGenusType[];
	varieties: PokemonVarietiesType[]
}

export type PokemonType = {
	sprites: {
		front_default: string;
		[key: string]: string;
	}
}

export type PokemonGraphQLRecord = {
	id: string;
	image: string;
	names: string[];
	genus: string[];
	versions: {
		version: string;
		description: string[]
	}[];
}

export type PokemonGraphQLQueryResult = {
	node: PokemonGraphQLRecord
}

export type LocalSearchPage = {
	index: string,
	store: {
		[key: string]: PokemonGraphQLRecord
	}
}
