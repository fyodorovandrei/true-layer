import React from 'react';
import { graphql } from "gatsby";
import { Trans, useI18next } from "gatsby-plugin-react-i18next";
import { useDetectVersionOfPokemon, useLocalizedPokemon } from "../hooks";
import { Header, Page } from "../components";
import type { PokemonGraphQLRecord } from "../../types";
import type { PageProps } from "gatsby";
import * as classnames from "./PokemonDetails.module.css";

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

const PokemonDetails: React.FC<PageProps<DataProps, PageContextType>> = ({ pageContext: { pokemon}},) => {
	const i18next = useI18next()
	const { image, id, name, genus, versions } = useLocalizedPokemon(pokemon);
	const { description, version } = useDetectVersionOfPokemon(versions);

	const handleChangeSelect = async (el: React.ChangeEvent<HTMLSelectElement>) => {
		await i18next.navigate(`/pokemon/${id}/?version=${el.target.value}`);
	}

	return (
		<Page>
			<Header />
			<div className={classnames.details}>
				<img className={classnames.image} src={image} alt={name}/>
				<p className={classnames.id}>#{id}</p>
				<h1 className={classnames.name}>{name}</h1>
				<p><Trans>Genus</Trans>: {genus}</p>
				<div>
					<Trans>Version</Trans>:
					<select className={classnames.select} onChange={handleChangeSelect} value={version}>
						{versions.map(({version}) => (
							<option value={version} key={version}>{version}</option>
						))}
					</select>
				</div>
				<p><Trans>Description</Trans>: {description || <i><Trans>Missing description</Trans></i>}</p>
			</div>
		</Page>
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

