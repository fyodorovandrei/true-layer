import * as React from "react"
import { graphql } from "gatsby";
import { Trans, Link } from "gatsby-plugin-react-i18next";
import { Header, PokemonCard, Pagination } from "../components";
import { useLocalizedPokemonList } from "../hooks";
import type { PageProps } from "gatsby"
import type { PokemonGraphQLQueryResult } from "../../types";
import * as classnames from "./Index.module.css";

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
	group: PokemonGraphQLQueryResult[];
	pathPrefix: string;
	first: boolean;
	last: boolean;
	index: number;
	pageCount: number;
	language: string;
}

const IndexPage: React.FC<PageProps<DataProps, PageContextType>> = ({ pageContext}) => {
	const { group, first, last, index } = pageContext;

	const localizedPokemonList = useLocalizedPokemonList(group);

	return (
		<main className={classnames.main}>
			<Header />
			<Trans>Hello World</Trans>
			<div className={classnames.pokemonList}>
				{localizedPokemonList.map(({id, image, name}) => (
					<Link className={classnames.cardLink} to={`/pokemon/${id}`} key={id}>
						<PokemonCard image={image} name={name} />
					</Link>
				))}
			</div>
			<div className={classnames.pagination}>
				<Pagination first={first} last={last} index={index} />
			</div>
		</main>
	)
}

export default IndexPage;

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
