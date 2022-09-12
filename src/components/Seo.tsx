/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby";
import React from "react";

interface Props {
  description?: string;
  title: string;
}

interface StaticQuery {
  logo: {
    publicURL: string;
  };
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
    };
  };
}

export function Seo({ description, title }: Props) {
  const { site, logo } = useStaticQuery(
    graphql`
      query {
        logo: file(
          relativePath: { eq: "logo.png" }
          sourceInstanceName: { eq: "assets" }
        ) {
          publicURL
        }
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  ) as StaticQuery;
  const metaDescription = description ?? site.siteMetadata.description;
  const defaultTitle = site.siteMetadata.title;

  return (
    <>
      <title>{`${title} | ${defaultTitle}`}</title>
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content="website" />
      <meta name="image" content={logo.publicURL} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={logo.publicURL} />
      {/* <meta name="twitter:url" content={seo.url} /> */}
    </>
  );
}
