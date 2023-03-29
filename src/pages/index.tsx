import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Trans, useTranslation, useI18next } from "gatsby-plugin-react-i18next";
import { graphql } from "gatsby";
import { Header } from "../components";

type PokemonGraphQL = {
    name: string;
    image: string;
    names: string[];
    genus: string[];
    versions: {
        version: string;
        description: string[]
    }[];
}

type PokemonGraphQLQueryResult = {
    node: PokemonGraphQL
}

type DataProps = {
    pokemon: {
        edges: PokemonGraphQLQueryResult[]
    }
}

const useTranslatedPokemon = (pokemon: PokemonGraphQLQueryResult[]) => {
    const { language, languages } = useI18next();
    const index = languages.indexOf(language);

    return pokemon.map(({ node: {
        names, image, genus, versions
    } }) => ({
        name: names[index],
        genus: genus[index],
        image,
        versions: versions.map(({version, description}) => ({
            version,
            description: description[index]
        }))
    }))
}

const IndexPage = ({data: {pokemon: {edges: pokemon}}}: PageProps<DataProps>) => {
    const translatedPokemon = useTranslatedPokemon(pokemon);

    return (
        <main>
            <Header/>
            <Trans>Hello World</Trans>
            {translatedPokemon.map((data, i) => (
                <div key={i}>
                    <img src={data.image} alt={data.name}/>
                    <p>Name: {data.name}</p>
                </div>
            ))}
        </main>
    )
}

export default IndexPage

export const Head: HeadFC = () => {
    const {t} = useTranslation();
    return <title>{t("Home")}</title>;
};

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
        pokemon: allPokemon {
            edges {
                node {
                    image,
                    names,
                    versions {
                        version,
                        description
                    },
                    genus
                }
            }
        }
    }
`;
