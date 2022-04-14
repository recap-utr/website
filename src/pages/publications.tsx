import { Stack } from "@chakra-ui/react";
import { graphql } from "gatsby";
import React from "react";
import Citation, { Props as CitationProps } from "../components/Citation";
import Layout from "../components/Layout";

interface Props {
  data: {
    allCitation: {
      nodes: Array<CitationProps>;
    };
  };
}

const Page: React.FC<Props> = ({ data }) => (
  <Layout title="Publications related to ReCAP">
    <Stack spacing={10}>
      {data.allCitation.nodes.map((citation) => (
        <Citation {...citation} key={citation.citation_label} />
      ))}
    </Stack>
  </Layout>
);

export const query = graphql`
  query {
    allCitation(sort: { fields: issued___date_parts, order: DESC }) {
      nodes {
        citation_label
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

export default Page;