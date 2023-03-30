import { useI18next } from "gatsby-plugin-react-i18next";
import type { PokemonGraphQLQueryResult } from "../../types";

export const useLocalizedPokemonList = (pokemon: PokemonGraphQLQueryResult[]) => {
	const {language, languages} = useI18next();
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
