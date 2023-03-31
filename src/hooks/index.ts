import { useI18next } from "gatsby-plugin-react-i18next";
import { useLocation } from "@reach/router";
import type { PokemonGraphQLQueryResult, PokemonGraphQLRecord } from "../../types";
import {useMemo} from "react";

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
