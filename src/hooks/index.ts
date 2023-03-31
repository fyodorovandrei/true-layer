import { useMemo } from "react";
import { useI18next } from "gatsby-plugin-react-i18next";
import { useLocation } from "@reach/router";
import { useFlexSearch } from 'react-use-flexsearch';
import type { LocalSearchPage, PokemonGraphQLQueryResult, PokemonGraphQLRecord } from "../../types";

export const useLocalizedPokemonList = (pokemon: PokemonGraphQLQueryResult[]) => {
	const { language, languages } = useI18next();
	const index = languages.indexOf(language);

	return pokemon.map(({
        node: {
            names, genus, versions, ...other
        }
    }) => ({
		...other,
		name: names[index],
		genus: genus[index],
		versions: versions.map(({version, description}) => ({
			version,
			description: description[index]
		}))
	}))
}

export const useLocalizedPokemon = ({names, genus, versions, ...other}: PokemonGraphQLRecord) => {
	const { language, languages } = useI18next();
	const index = languages.indexOf(language);

	return {
		...other,
		name: names[index],
		genus: genus[index],
		versions: versions.map(({version, description}) => ({
			version,
			description: description[index]
		}))
	}
}

export const useDetectVersionOfPokemon = (versions: { version: string; description: string }[]) => {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const queryVersion = query.get("version");

	const defaultVersion = useMemo(() => versions.find(({version}) => {
		const defaultVersions = queryVersion ? [queryVersion] : ['x', 'y'];
		return defaultVersions.includes(version);
	}), [versions, queryVersion]);

	return defaultVersion || versions[0];
}

export const useLocalSearch = (localSearchPages: LocalSearchPage, searchQuery: string | null) => {
	const { store, index } = localSearchPages;
	const results = useFlexSearch(searchQuery || "", index, store) as PokemonGraphQLRecord[];

	return results.map(node => ({node}));
}
