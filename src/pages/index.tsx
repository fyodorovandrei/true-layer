import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import { graphql } from "gatsby";
import { Header } from "../components";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
        <Header/>
        <Trans>Hello World</Trans>
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
  }
`;
