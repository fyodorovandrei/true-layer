import type { GatsbyConfig } from "gatsby";
import { languages, defaultLanguage } from "./i18next";

export const query = `
	query {
		pokemon: allPokemon {
		    edges {
		        node {
		            id,
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

const siteUrl = process.env.URL || "https://www.yourdomain.tld";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "true-layer",
    siteUrl,
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/locales`,
        name: "locale"
      }
    },
    {
      resolve: "gatsby-plugin-react-i18next",
      options: {
        localeJsonSourceName: "locale",
        languages,
        defaultLanguage,
        trailingSlash: "always",
        i18nextOptions: {
          defaultNS: "common",
          lowerCaseLng: true,
          saveMissing: false,
          interpolation: {
            escapeValue: false
          },
          keySeparator: false,
          nsSeparator: false,
        }
      }
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        name: "pages",
        engine: "flexsearch",
        query,
        ref: "id",
        index: ["names"],
        store: ["id", "names", "genus", "image", "versions"],
        normalizer: ({ data }: any) => data.pokemon.edges.map(({node}: any) => node),
      }
    }
  ],
}

export default config
