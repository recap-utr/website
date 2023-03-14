import { GatsbyConfig } from "gatsby";
import path from "path";

const config: GatsbyConfig = {
  trailingSlash: "always",
  siteMetadata: {
    title: `ReCAP Trier University`,
    description: `Research project at Trier University that is funded by DFG and concerned with building an argumentation machine.`,
    siteUrl: `https://recap.uni-trier.de`,
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
        icon: "./src/data/logo.png",
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
        name: "content",
        path: "./src/content/",
      },
    },
    "@chakra-ui/gatsby-plugin",
    {
      resolve: "@floris.groenendijk/gatsby-plugin-nginx-redirect",
      options: {
        inputConfigFile: path.resolve("nginx.conf"),
        outputConfigFile: path.resolve("nginx.out.conf"),
      },
    },
  ],
};

export default config;
