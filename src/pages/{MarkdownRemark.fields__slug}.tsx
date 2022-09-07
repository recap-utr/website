import { graphql, HeadFC } from "gatsby";
import React, { createElement, Fragment } from "react";
import rehypeReact from "rehype-react";
import { unified } from "unified";
import * as body from "../components/BodyComponents";
import Layout from "../components/Layout";
import { Seo } from "../components/Seo";

const processor = unified().use(rehypeReact, {
  createElement,
  Fragment,
  components: {
    h2: body.H2,
    h3: body.H3,
    h4: body.H4,
    h5: body.H5,
    h6: body.H6,
    a: body.A,
    p: body.P,
    li: body.Li,
    ul: body.Ul,
    ol: body.Ol,
    hr: body.Hr,
    i: body.I,
    em: body.Em,
    strong: body.Strong,
  } as any,
});

const renderAst = (ast: any): JSX.Element => {
  return processor.stringify(ast) as unknown as JSX.Element;
};

export interface Props {
  data: {
    page: {
      htmlAst: any;
      frontmatter: {
        title: string;
        description?: string;
      };
    };
  };
}

const Page: React.FC<Props> = ({ data }) => {
  const { page } = data;
  const { frontmatter, htmlAst } = page;
  return <Layout title={frontmatter.title}>{renderAst(htmlAst)}</Layout>;
};

export const query = graphql`
  query ($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
      }
      htmlAst
    }
  }
`;

export const Head: HeadFC<Props> = ({ data }) => {
  const frontmatter = data.data.page.frontmatter;

  return (
    <Seo title={frontmatter.title} description={frontmatter.description} />
  );
};

export default Page;
