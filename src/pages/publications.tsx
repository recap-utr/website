import { Heading, Stack } from "@chakra-ui/react";
import { graphql, HeadFC, PageProps } from "gatsby";
import React from "react";
import Citation, { Props as CitationProps } from "../components/Citation";
import Layout from "../components/Layout";
import { Seo } from "../components/Seo";

const TITLE = "Publications";
interface Props {
  allCitation: {
    nodes: Array<CitationProps>;
  };
  allFile: {
    nodes: Array<{
      publicURL: string;
      name: string;
    }>;
  };
}

const Page: React.FC<PageProps<Props>> = ({ data }) => {
  const fileUrls = Object.fromEntries(
    data.allFile.nodes.map((file) => [file.name, file.publicURL])
  );
  const publicationsPerYear: { [k: string]: Array<CitationProps> } = {};

  data.allCitation.nodes.forEach((citation) => {
    const year = citation.issued?.date_parts[0][0];
    if (year !== undefined) {
      if (publicationsPerYear[year] === undefined) {
        publicationsPerYear[year] = [];
      }

      publicationsPerYear[year].push(citation);
    }
  });

  return (
    <Layout title={TITLE}>
      <Stack spacing={10} mt={10}>
        {Object.keys(publicationsPerYear)
          .sort()
          .reverse()
          .map((year) => (
            <Stack key={year} spacing={3}>
              <Heading as="h2" size="lg">
                {year}
              </Heading>
              <Stack spacing={7}>
                {publicationsPerYear[year]
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((citation) => (
                    <Citation
                      {...citation}
                      key={citation.citation_key}
                      fileUrl={fileUrls[citation.citation_key]}
                    />
                  ))}
              </Stack>
            </Stack>
          ))}
      </Stack>
    </Layout>
  );
};

export const query = graphql`
  query {
    allFile(
      filter: {
        sourceInstanceName: { eq: "assets" }
        relativeDirectory: { eq: "publications" }
      }
    ) {
      nodes {
        publicURL
        name
      }
    }
    allCitation {
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
        event_title
        collection_title
        page
        volume
        publisher
        issued {
          date_parts
        }
        publisher_place
        type
        editor {
          given
          family
        }
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
