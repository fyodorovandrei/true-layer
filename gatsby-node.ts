import axios from "axios"
import * as crypto from "crypto";
import * as path from "path";
import createPaginatedPages from "gatsby-paginate";
import { languages } from "./i18next";
import { getAsStaticFile } from "./src/utils/node";
import { query } from "./gatsby-config";
import type { SourceNodesArgs, CreatePagesArgs } from "gatsby";
import type { PokemonSpecieListReturnType, PokemonSpeciesType, PokemonType, PokemonGraphQLRecord, PokemonGraphQLQueryResult } from "./types";

exports.sourceNodes = async ({ actions }: SourceNodesArgs) => {
	const { createNode } = actions;

	try {
		const pokemonSpeciesRequest = await axios.get<PokemonSpecieListReturnType>(`https://pokeapi.co/api/v2/pokemon-species?limit=200&offset=0`);

		for (const pokemon of pokemonSpeciesRequest.data.results) {
			const pokemonSpeciesRequest = await axios.get<PokemonSpeciesType>(pokemon.url);
			const {
				id,
				names: pokemonNames,
				flavor_text_entries,
				genera,
				varieties
			} = pokemonSpeciesRequest.data;

			// Extract versions for available languages
			const versions: PokemonGraphQLRecord["versions"] = [];
			const versionsRef: Record<string, number> = {};
			flavor_text_entries.forEach(({ language, flavor_text, version }) => {
				if (languages.includes(language.name) && flavor_text !== undefined) {
					const index = languages.indexOf(language.name);
					const versionIndex = versionsRef[version.name];

					if (versionIndex !== undefined) {
						const { description } = versions[versionIndex];
						description[index] = flavor_text;
						versions[versionIndex] = {
							...versions[versionIndex],
							description
						};
					} else {
						versionsRef[version.name] = versions.length;
						const description = [];
						description[index] = flavor_text;
						versions.push({
							version: version.name,
							description
						});
					}
				}
			});

			// Extract names for available languages
			const names: string[] = [];
			pokemonNames.forEach(({language, name}) => {
				if (languages.includes(language.name)) {
					const index = languages.indexOf(language.name);
					names[index] = name;
				}
			});

			// Extract genus for available languages
			const genus: string[] = [];
			genera.forEach(({language, genus: pokemonGenus}) => {
				if (languages.includes(language.name)) {
					const index = languages.indexOf(language.name);
					genus[index] = pokemonGenus;
				}
			})

			let image: string | undefined = undefined;
			const defaultVariety = varieties.find((variety) => variety.is_default);
			if (defaultVariety) {
				const pokemonDetailsRequest = await axios.get<PokemonType>(defaultVariety.pokemon.url);
				image = await getAsStaticFile(pokemonDetailsRequest.data.sprites.front_default);
			}

			const pokemonNode = {
				id: id.toString(),
				parent: "__SOURCE__",
				internal: {
					type: "Pokemon",
					contentDigest: ""
				},
				children: [],
				names,
				versions,
				genus,
				image
			}

			pokemonNode.internal.contentDigest = crypto
				.createHash("md5")
				.update(JSON.stringify(pokemonNode))
				.digest("hex");

			createNode(pokemonNode);
		}
	} catch (e) {
		console.error(e)
		process.exit(1)
	}

	return;
}

exports.createPages = async ({ graphql, actions: { createPage } }: CreatePagesArgs) => {
	const result = await graphql<{ pokemon: { edges: PokemonGraphQLQueryResult[] } }>(query);

	const edges = result.data?.pokemon.edges || [];

	createPaginatedPages({
		edges,
		createPage,
		pageTemplate: path.resolve('./src/templates/Index.tsx'),
		pageLength: 8,
		pathPrefix: '',
		context: {},
	});

	edges.map(({ node: pokemon }) => {
		createPage({
			path: `/pokemon/${pokemon.id}`,
			component: path.resolve('./src/templates/PokemonDetails.tsx'),
			context: {
				pokemon
			},
		})
	});
}
