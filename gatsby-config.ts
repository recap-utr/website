import { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  trailingSlash: "always",
  siteMetadata: {
    title: `ReCAP Trier University`,
    siteUrl: `https://recap.uni-trier.de`,
  },
  plugins: [
    // "gatsby-plugin-netlify",
    "gatsby-plugin-image",
    "gatsby-transformer-yaml",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    // "gatsby-plugin-typescript",
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
          quality: 50,
        },
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: "./src/data/",
      },
    },
    "@chakra-ui/gatsby-plugin",
  ],
};

export default config;
