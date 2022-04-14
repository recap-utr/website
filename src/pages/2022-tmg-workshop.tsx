import { Center, SimpleGrid, Wrap, WrapItem } from "@chakra-ui/react";
import { graphql } from "gatsby";
import { ImageDataLike, StaticImage } from "gatsby-plugin-image";
import React from "react";
import { A, H2, Li, P, Ul } from "../components/BodyComponents";
import Layout from "../components/Layout";
import Profiles from "../components/Profiles";
import Table from "../components/Table";
import Tag from "../components/Tag";

interface Props {
  data: {
    members: {
      nodes: Array<{
        avatar: ImageDataLike;
        affiliation: string;
        email: string;
        name: string;
      }>;
    };
    schedule: {
      nodes: Array<{
        start: string;
        end: string;
        event: string;
      }>;
    };
  };
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
  <Layout
    title="Workshop on Text Mining and Generation (TMG) at KI-2022"
    description="One-day workshop co-located with KI-2022 concerned with transforming text data between structured and unstructured representations."
  >
    <Wrap justify="center" mt={10} mb={10} spacingX={5} spacingY={2}>
      <WrapItem>
        <Tag icon="calendar-alt">September 19 or 20, 2022</Tag>
      </WrapItem>
      <WrapItem>
        <Tag icon="clock">One-day workshop</Tag>
      </WrapItem>
      <WrapItem>
        <Tag icon="info-circle">
          Co-located with <A href="https://ki2022.gi.de/">KI-2022</A>
        </Tag>
      </WrapItem>
      <WrapItem>
        <Tag icon="location-dot">Trier, Germany</Tag>
      </WrapItem>
    </Wrap>
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
      Since recent approaches to text mining and text generation are predominantly based on artificial intelligence (AI) methodologies, KI 2022 is a relevant venue to bring together AI researchers working on these two tasks.
    </P>

    <H2>Important Dates</H2>
    <Table
      props={{ variant: "striped", size: "sm" }}
      caption="All dates are calculated at 11:59 AoE"
      columns={["Date", "Description"]}
      rows={[
        ["July 15, 2022", "Submission due"],
        ["August 20, 2022", "Author Notification"],
        ["August 31, 2022", "Camera Ready"],
        ["September 19 or 20, 2022", "Workshop Date"],
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
      <Li>Ethical aspects of AI for text generation (e.g., mitigating bias, misinformation, etc.).</Li>
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
    {/* <H3>Submission Information</H3> */}
    {/* prettier-ignore */}
    <P>
      Details regarding the submission procedure have yet to be determined and will be posted on this website as soon as possible.
    </P>
    {/* <P>
      The submission of the papers should be in accordance to the Springer LNCS style and have to be submitted via EasyChair.
      The maximum number of pages is 12 excluding references.
      The workshop is running a single-blind review process.
    </P> */}
    {/* <Stack direction={{ base: "column", md: "row" }} mt={5} mb={5}>
      <ButtonLink
        color="blue"
        icon="circle-check"
        href="https://easychair.org/conferences/?conf=ki2022"
      >
        Submit
      </ButtonLink>
      <ButtonLink
        icon="section"
        href="https://ki2022.gi.de/calls/call-for-papers"
      >
        Guidelines
      </ButtonLink>
      <ButtonLink
        icon="book"
        href="https://www.springer.com/gp/computer-science/lncs/conference-proceedings-guidelines"
      >
        Springer LNCS Template
      </ButtonLink>
    </Stack> */}

    <H2>Keynote by Prof. Dr. Iryna Gurevych</H2>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      <Center>
        <StaticImage
          width={300}
          height={300}
          transformOptions={{ cropFocus: "centre" }}
          src="../images/gurevych.jpg"
          alt="Prof. Dr. Iryna Gurevych"
        />
      </Center>
      {/* prettier-ignore */}
      <P>
        We are pleased to announce that Prof. Dr. Iryna Gurevych from the Ubiquitous Knowledge Processing (UKP) Lab at the Technical University of Darmstadt will hold a keynote as part of our workshop.
        A concrete topic is yet to be determined and will be posted on this website as soon as possible.
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
            gatsbyImageData(
              width: 300
              height: 300
              transformOptions: { cropFocus: CENTER }
            )
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
