import * as React from "react"
import { graphql } from "gatsby";
import { Link, useI18next, Trans } from "gatsby-plugin-react-i18next";
import { Header, PokemonCard, Pagination, Page, Search } from "../components";
import { useLocation } from "@reach/router";
import { useLocalizedPokemonList, useLocalSearch } from "../hooks";
import type { PageProps } from "gatsby"
import type { PokemonGraphQLQueryResult, LocalSearchPage } from "../../types";
import * as classnames from "./Index.module.css";

type DataProps = {
	edges: {
		node: {
			data: string;
			language: string;
			ns: string;
		}
	}[];
	localSearchPages: LocalSearchPage,
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

const IndexPage: React.FC<PageProps<DataProps, PageContextType>> = (
	{
		pageContext,
		data
	}
) => {
	const { group, first, last, index } = pageContext;
	const { localSearchPages } = data;

	const i18next = useI18next();
	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);
	const searchQuery = queryParams.get('query');

	const searchResult = useLocalSearch(localSearchPages, searchQuery);
	const localizedPokemonList = useLocalizedPokemonList(searchQuery ? searchResult : group);

	const handleSearch = async (value: string) => {
		if (value === "") {
			queryParams.delete("query");
		} else {
			queryParams.set("query", value);
		}
		await i18next.navigate(`/?${queryParams.toString()}`)
	}

	return (
		<Page>
			<Header />
			<div className={classnames.search}>
				<Search query={searchQuery} onSearch={handleSearch} />
			</div>
			<div
				className={
					`${classnames.pokemonList} ${localizedPokemonList.length === 0 ? classnames.emptyList : ""}`
				}
			>
				{localizedPokemonList.map(({id, image, name}) => (
					<Link className={classnames.cardLink} to={`/pokemon/${id}`} key={id}>
						<PokemonCard image={image} name={name} />
					</Link>
				))}
				{localizedPokemonList.length === 0 && (
					<div className={classnames.empty}>
						<Trans>No Pokemon found</Trans>
					</div>
				)}
			</div>
			{(localizedPokemonList.length !== 0 && !searchQuery) && (
				<div className={classnames.pagination}>
					<Pagination first={first} last={last} index={index} />
				</div>
			)}
		</Page>
	)
}

export default IndexPage;

export const query = graphql`
    query ($language: String!) {
        localSearchPages {
            index
            store
        }
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
