import { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  trailingSlash: "always",
  siteMetadata: {
    title: `ReCAP Trier University`,
    description: `Research project at Trier University that is funded by DFG and concerned with building an argumentation machine.`,
    siteUrl: `https://recap.uni-trier.de`,
    googleSiteVerification: "5J3ie7V600FTqQeFo9o6zKgcTMvNXkctPhKiABIdjzE",
  },
  plugins: [
    // "gatsby-plugin-netlify",
    "gatsby-plugin-image",
    "gatsby-transformer-yaml",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "./src/assets/logo.png",
      },
    },
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          formats: ["auto", "webp"],
          placeholder: "blurred",
          quality: 90,
        },
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: "./src/data/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "./src/assets/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./src/content/",
      },
    },
    "@chakra-ui/gatsby-plugin",
  ],
};

export default config;
