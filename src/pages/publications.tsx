import { Stack } from "@chakra-ui/react";
import { graphql, HeadFC } from "gatsby";
import React from "react";
import Citation, { Props as CitationProps } from "../components/Citation";
import Layout from "../components/Layout";
import { Seo } from "../components/Seo";

const TITLE = "Publications";
interface Props {
  data: {
    allCitation: {
      nodes: Array<CitationProps>;
    };
  };
}

const Page: React.FC<Props> = ({ data }) => (
  <Layout title={TITLE}>
    <Stack spacing={7} mt={5}>
      {data.allCitation.nodes.map((citation) => (
        <Citation {...citation} key={citation.citation_key} />
      ))}
    </Stack>
  </Layout>
);

export const query = graphql`
  query {
    allCitation(sort: { fields: issued___date_parts, order: DESC }) {
      nodes {
        citation_key
        author {
          given
          family
        }
        title
        DOI
        URL
        container_title
        page
        volume
        publisher
        issued {
          date_parts
        }
        collection_title
        publisher_place
      }
    }
  }
`;

export const Head: HeadFC<Props> = ({ data }) => (
  <Seo
    title={TITLE}
    description="List of the most important publications created as part of the ReCAP project."
  />
);

export default Page;
