import { Box, SimpleGrid } from "@chakra-ui/react";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { H2, Li, P, Ul } from "../components/BodyComponents";
import Layout from "../components/Layout";
import Profiles from "../components/Profiles";
import Table from "../components/Table";

interface Props {
  data: any;
}

// const headers = {
//   CALL_FOR_PAPERS: {
//     title: "Call for Papers",
//     icon: "house"
//   },
//   KEYNOTE: {
//     title: "Keynote",
//     icon: "house"
//   },
// }

const Page: React.FC<Props> = ({ data }) => (
  <Layout title="Workshop on Text Mining and Generation (TMG) at KI-2022">
    <P>
      Digital text data is available in large amounts and different
      granularities. Typical sources include social media posts, books, news
      articles, web pages or company reports, etc. A major challenge this text
      data imposes is that it is unstructured and must first be processed to
      make further analysis possible. At the same time, there are also many
      situations in which only structured data is available that is to be
      verbally explained—for instance, by Explainable AI. These contrasting
      scenarios lead to two complementary application areas: text mining and
      text generation. The aim of text mining is to analyze the content of
      unstructured text and extract (useful) structured information. In
      contrast, text generation attempts to (automatically) create text from
      structured information or knowledge that is for example stored in large
      language models. The goal of the TMG workshop is to bring these two
      perspectives together by eliciting research paper submissions that aim for
      bridging the gap between knowledge extraction and text generation. Since
      recent approaches to text mining and text generation are predominantly
      based on artificial intelligence (AI) methodologies, KI 2022 is a relevant
      venue to bring together AI researchers working on these two tasks.
    </P>

    <H2>Important Dates</H2>
    <Table
      props={{ variant: "striped", size: "sm" }}
      caption="All dates are calculated at 11:59 AoE"
      columns={["Date", "Description"]}
      rows={[
        ["July 15, 2022", "Submission due"],
        ["August 20, 2022", "Author Notification"],
        ["August 31, 2022", "Workshop Date"],
        ["September 19, 2022", "Workshop Date"],
      ]}
    />

    <H2>Call for Papers</H2>
    <P>
      We welcome any submissions that deal with transforming the representation
      of data using techniques of natural language processing (NLP): (applied)
      research papers, theoretical papers, user studies or prospective papers.
      Topics include, but are not limited to, the following:
    </P>
    <Ul>
      <Li>Answer generation for question answering.</Li>
      <Li>Argument mining.</Li>
      <Li>
        Ethical aspects of AI for text generation (e.g., mitigating bias,
        misinformation, etc.).
      </Li>
      <Li>Generating descriptions for graph-based workflows.</Li>
      <Li>Generating explanations in recommender systems.</Li>
      <Li>Graph-to-text generation for knowledge graphs.</Li>
      <Li>Methods for Explainable AI.</Li>
      <Li>Information extraction.</Li>
      <Li>
        Knowledge graph refinement, particularly featuring text-based signals.
      </Li>
      <Li>Parsing argumentative structures in texts.</Li>
      <Li>Pattern detection in log files.</Li>
      <Li>Snippet generation for search results.</Li>
      <Li>Summarization.</Li>
      <Li>Workflow mining.</Li>
    </Ul>

    <H2>Keynote by Prof. Dr. Iryna Gurevych</H2>
    <SimpleGrid columns={2} spacing={5}>
      <Box>
        <StaticImage
          aspectRatio={1}
          transformOptions={{ cropFocus: "centre" }}
          src="../images/gurevych-ukp.jpg"
          imgStyle={{ borderRadius: 9999 }}
          alt="Prof. Dr. Iryna Gurevych"
        />
      </Box>
      <P>
        Pariatur ipsum consectetur in qui Lorem culpa in deserunt amet. Aliquip
        eu voluptate nisi in ad sunt enim veniam et. Quis veniam ad veniam.
        Velit nostrud ipsum labore pariatur nulla ea aliquip in incididunt
        officia ipsum dolor cupidatat. Do aliqua veniam dolore. Duis velit do ea
        nostrud ad quis elit nostrud quis cupidatat eu laboris. Eiusmod nulla
        excepteur commodo tempor minim est reprehenderit laborum proident amet
        incididunt. Dolor tempor voluptate commodo occaecat cupidatat aute
        commodo voluptate reprehenderit ullamco elit eu dolor occaecat deserunt.
        Elit deserunt ut fugiat sunt consectetur pariatur. Aute id et in ex sunt
        anim officia sit irure anim labore velit.
      </P>
    </SimpleGrid>

    <H2>Preliminary Schedule</H2>
    <Table
      props={{ variant: "striped", size: "sm" }}
      columns={["Start", "End", "Event"]}
      rows={data.schedule.nodes.map((entry: any) => [
        entry.start,
        entry.end,
        entry.event,
      ])}
    />

    <H2>Organizing and Program Committee</H2>
    <Profiles profiles={data.members.nodes} />
  </Layout>
);

export const query = graphql`
  query {
    members: allCommitteeMembersYaml {
      nodes {
        avatar {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1)
          }
        }
        affiliation
        email
        name
      }
    }
    schedule: allWorkshopScheduleYaml {
      nodes {
        start
        end
        event
      }
    }
  }
`;

export default Page;
