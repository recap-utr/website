import { Center, SimpleGrid } from "@chakra-ui/react";
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
    {/* prettier-ignore */}
    <P>
      Digital text data is available in large amounts and different granularities.
      Typical sources include social media posts, books, news articles, web pages or company reports, etc.
      A major challenge this text data imposes is that it is unstructured and must first be processed to make further analysis possible.
      At the same time, there are also many situations in which only structured data is available that is to be verbally explained—for instance, by Explainable AI.
      These contrasting scenarios lead to two complementary application areas: text mining and text generation.
      The aim of text mining is to analyze the content of unstructured text and extract (useful) structured information.
      In contrast, text generation attempts to (automatically) create text from structured information or knowledge that is for example stored in large language models.
      The goal of the TMG workshop is to bring these two perspectives together by eliciting research paper submissions that aim for bridging the gap between knowledge extraction and text generation.
      Since recent approaches to text mining and text generation are predominantly based on artificial intelligence (AI) methodologies, KI 2022 is a relevant venue to bring together AI researchers working on these two tasks
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
    {/* prettier-ignore */}
    <P>
      We welcome any submissions that deal with transforming the representation of data using techniques of natural language processing (NLP):
      (applied) research papers, theoretical papers, user studies or prospective papers.
      Topics include, but are not limited to, the following:
    </P>
    {/* prettier-ignore */}
    <Ul>
      <Li>Answer generation for question answering.</Li>
      <Li>Argument mining.</Li>
      <Li>Ethical aspects of AI for text generation (e.g., mitigating bias,misinformation, etc.).</Li>
      <Li>Generating descriptions for graph-based workflows.</Li>
      <Li>Generating explanations in recommender systems.</Li>
      <Li>Graph-to-text generation for knowledge graphs.</Li>
      <Li>Methods for Explainable AI.</Li>
      <Li>Information extraction.</Li>
      <Li>Knowledge graph refinement, particularly featuring text-based signals.</Li>
      <Li>Parsing argumentative structures in texts.</Li>
      <Li>Pattern detection in log files.</Li>
      <Li>Snippet generation for search results.</Li>
      <Li>Summarization.</Li>
      <Li>Workflow mining.</Li>
    </Ul>

    <H2>Keynote by Prof. Dr. Iryna Gurevych</H2>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <Center>
        <StaticImage
          width={300}
          height={300}
          transformOptions={{ cropFocus: "centre" }}
          imgStyle={{ borderRadius: 9999 }}
          src="../images/gurevych.jpg"
          alt="Prof. Dr. Iryna Gurevych"
        />
      </Center>
      {/* prettier-ignore */}
      <P>
        Dolor minim nisi mollit sit incididunt labore enim deserunt fugiat consequat qui nisi. Est eiusmod dolor deserunt qui culpa cillum nisi dolor adipisicing duis. Laborum exercitation fugiat laboris exercitation minim nostrud in eu consequat. Mollit nisi nostrud consectetur ipsum ex ex anim elit. Occaecat irure qui ea nostrud excepteur velit anim nulla proident consectetur qui. Pariatur aute duis laborum aute irure culpa aliqua eu laboris et est officia anim. Dolor cupidatat ea ullamco ipsum veniam. Sunt sint enim velit cillum irure ad et ipsum laborum deserunt. Dolor sunt reprehenderit aliqua minim velit aliqua. Ullamco qui laborum officia sint non pariatur sint.
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
