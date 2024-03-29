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
    childImageSharp: {
      resize: {
        src: string;
      };
    };
  };
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
      googleSiteVerification: string;
    };
  };
}

export function Seo({ description, title }: Props) {
  const { site, logo } = useStaticQuery(
    graphql`
      query {
        logo: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            resize {
              src
            }
          }
        }
        site {
          siteMetadata {
            title
            description
            siteUrl
            googleSiteVerification
          }
        }
      }
    `
  ) as StaticQuery;
  const metaDescription = description ?? site.siteMetadata.description;
  const siteTitle = site.siteMetadata.title;
  const logoUrl = logo.childImageSharp.resize.src;
  const browserTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <>
      <title>{browserTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content="website" />
      <meta name="image" content={logoUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={logoUrl} />
      {/* <meta name="twitter:url" content={seo.url} /> */}
      <meta
        name="google-site-verification"
        content={site.siteMetadata.googleSiteVerification}
      />
    </>
  );
}
