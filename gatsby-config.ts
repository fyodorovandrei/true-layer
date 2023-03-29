import type { GatsbyConfig } from "gatsby";
import { languages, defaultLanguage } from "./i18next";

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
      resolve: `gatsby-plugin-react-i18next`,
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
    }
  ],
}

export default config
