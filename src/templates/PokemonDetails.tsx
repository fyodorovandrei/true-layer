import React from 'react';
import type { PageProps } from "gatsby";
import { PokemonGraphQLRecord } from "../../types";
import {graphql} from "gatsby";

type DataProps = {
	edges: {
		node: {
			data: string;
			language: string;
			ns: string;
		}
	}[];
}

type PageContextType = {
	pokemon: PokemonGraphQLRecord;
	language: string;
}

const PokemonDetails: React.FC<PageProps<DataProps, PageContextType>> = ({ pageContext: { pokemon}}) => {
	console.log(pokemon)
	return (
		<div>
		POST
		</div>
	);
};

export default PokemonDetails;

export const query = graphql`
    query ($language: String!) {
        locales: allLocale(filter: {ns: {in: ["translation"]}, language: {eq: $language}}) {
            edges {
                node {
                    ns
                    data
                    language
                }
            }
        }
    }
`;

