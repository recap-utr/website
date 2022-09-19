import {
  Center,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { ImageDataLike, StaticImage } from "gatsby-plugin-image";
import React from "react";
import { A, H2, H3, Li, P, Ul } from "../components/BodyComponents";
import ButtonLink from "../components/ButtonLink";
import Layout from "../components/Layout";
import Link from "../components/Link";
import Profiles from "../components/Profiles";
import { Seo } from "../components/Seo";
import Table from "../components/Table";
import Tag from "../components/Tag";

const TITLE = "Workshop on Text Mining and Generation (TMG) at KI-2022";

interface PaperProps {
  title: string;
  authors: Array<string>;
  url?: string;
}

const Paper: React.FC<PaperProps> = ({ title, authors, url }) => {
  let content = (
    <Text as="div">
      {authors.join(", ")}
      <br />
      <i>{title}</i>
    </Text>
  );

  if (url !== undefined) {
    content = <Link href={url}>{content}</Link>;
  }

  return <ListItem>{content}</ListItem>;
};

interface Props {
  members: {
    nodes: Array<{
      avatar: ImageDataLike;
      affiliation: string;
      email: string;
      name: string;
    }>;
  };
}

const Page: React.FC<PageProps<Props>> = ({ data }) => (
  <Layout title={TITLE}>
    {/* <Alert mt={10} mb={5} status="info">
      <AlertIcon />
      <Box>
        <AlertTitle>Schedule Available</AlertTitle>
        <AlertDescription>
          The final schedule has been added to our website and contains a list
          of accepted papers.
        </AlertDescription>
      </Box>
    </Alert> */}
    <Wrap justify="center" mt={10} mb={10} spacingX={5} spacingY={2}>
      <WrapItem>
        <Tag icon="calendar-alt">September 19, 2022</Tag>
      </WrapItem>
      <WrapItem>
        <Tag icon="clock">10:00–16:00</Tag>
      </WrapItem>
      <WrapItem>
        <Tag icon="info-circle">
          Co-located with <A href="https://ki2022.gi.de/">KI-2022</A>
        </Tag>
      </WrapItem>
      <WrapItem>
        <Tag icon="location-dot">Virtual (Hosted in Trier, Germany)</Tag>
      </WrapItem>
    </Wrap>
    <Center mb={10}>
      <ButtonLink
        color="orange"
        icon="pen-to-square"
        href="https://pretix.eu/gi/KI2022/"
      >
        Register Now (Free for Students)
      </ButtonLink>
    </Center>
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

    <H2>Workshop Schedule</H2>
    <Table
      props={{ variant: "striped", size: "sm" }}
      columns={["Start", "End", "Event"]}
      rows={[
        ["10:00", "10:10", <b>Opening</b>],
        [
          "10:10",
          "11:45",
          <>
            <Text as="b">Session 1: Original Papers</Text>
            <UnorderedList mt={2} spacing={2}>
              <Paper
                title="German to English: Fake News Detection with Machine Translation"
                authors={["Jin Liu", "Steffen Thoma"]}
              />
              <Paper
                title="Inductive Linking and Ranking in Knowledge Graphs of Varying Scale"
                authors={["Felix Hamann", "Adrian Ulges", "Maurice Falk"]}
              />
              <Paper
                title="Explaining Hatespeech Detection with Model-Agnostic Methods: A Case Study on Twitter Dataset"
                authors={["Durgesh Nandini", "Ute Schmid"]}
              />
              <Paper
                title="Comparing Unsupervised Algorithms to Construct Argument Graphs"
                authors={["Mirko Lenz", "Premtim Sahitaj", "Lorik Dumani"]}
              />
            </UnorderedList>
          </>,
        ],
        ["11:45", "13:30", <>Break</>],
        [
          "13:30",
          "14:30",
          <Link href="#keynote">
            <b>Keynote by Iryna Gurevych</b>
          </Link>,
        ],
        ["14:30", "14:45", <>Break</>],
        [
          "14:45",
          "15:45",
          <>
            <Text as="b">Session 2: Invited Talks</Text>
            <UnorderedList mt={2} spacing={2}>
              <Paper
                title="Extractive Snippet Generation for Arguments"
                authors={[
                  "Milad Alshomary",
                  "Nick Düsterhus",
                  "Henning Wachsmuth",
                ]}
                url="https://webis.de/downloads/publications/papers/alshomary_2020b.pdf"
              />
              <Paper
                title="Abstractive Snippet Generation"
                authors={[
                  "Wei-Fan Chen",
                  "Shahbaz Syed",
                  "Benno Stein",
                  "Matthias Hagen",
                  "Martin Potthast",
                ]}
                url="https://webis.de/downloads/publications/papers/chen_2020a.pdf"
              />
              <Paper
                title="An End-to-end Model for Entity-level Relation Extraction using Multi-instance Learning"
                authors={["Markus Eberts", "Adrian Ulges"]}
                url="https://aclanthology.org/2021.eacl-main.319"
              />
            </UnorderedList>
          </>,
        ],
        ["15:45", "16:15", <b>Closing and Open Panel Discussion</b>],
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
    <H3>Submission Information</H3>
    {/* <P>
      Details regarding the submission procedure have yet to be determined and will be posted on this website as soon as possible.
    </P> */}
    {/* prettier-ignore */}
    <P>
      The submission of the papers should be in accordance to the GI-LNI style and have to be submitted via EasyChair (please select the track <strong>W6: Text Mining and Generation</strong>).
      Authors can submit three different types of papers:
    </P>
    <Ul>
      <Li>Full Paper (up to 12 pages, excluding references)</Li>
      <Li>Short Paper (up to 6 pages, excluding references)</Li>
      <Li>Extended Abstract (up to 3 pages, excluding references)</Li>
    </Ul>
    <P>
      If selected for publication in the GI-LNI proceedings, authors will later
      get a possibility to submit an extended version of the paper disregarding
      their original submission format. The workshop is running a single-blind
      review process.
    </P>
    <Stack direction={{ base: "column", md: "row" }} mt={5} mb={5}>
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
        KI-2022 Guidelines
      </ButtonLink>
      <ButtonLink icon="book" href="https://github.com/gi-ev/LNI">
        GI-LNI Template
      </ButtonLink>
    </Stack>

    <H2>Important Dates</H2>
    <Table
      props={{ variant: "striped", size: "sm" }}
      caption="All dates are calculated at 11:59 AoE"
      columns={["Date", "Description"]}
      rows={[
        ["August 1, 2022", "Submission Due"],
        ["August 31, 2022", "Author Notification"],
        ["September 11, 2022", "Camera-Ready Version"],
        ["September 19, 2022", "Workshop Date"],
      ]}
    />

    <H2 id="keynote">Keynote by Prof. Dr. Iryna Gurevych</H2>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
      <Center>
        <StaticImage
          width={400}
          height={400}
          transformOptions={{ cropFocus: "centre" }}
          src="../images/gurevych.jpg"
          alt="Prof. Dr. Iryna Gurevych"
        />
      </Center>
      {/* prettier-ignore */}
      <P>
        Iryna Gurevych (PhD 2003, U. Duisburg-Essen, Germany) is professor of Computer Science and director of the Ubiquitous Knowledge Processing (UKP) Lab at the Technical University (TU) of Darmstadt in Germany.
        Her main research interests are in machine learning for large-scale language understanding and text semantics.
        Iryna's work has received numerous awards.
        Examples are the ACL fellow award 2020 and the first Hessian LOEWE Distinguished Chair award (2,5 mil. Euro) in 2021.
        Iryna is co-director of the NLP program within ELLIS, a European network of excellence in machine learning.
        She is currently the vice-president of the Association of Computational Linguistics.
      </P>
    </SimpleGrid>
    {/* prettier-ignore */}
    <H3>Detect—Verify—Communicate: Combating Misinformation with More Realistic NLP</H3>
    {/* prettier-ignore */}
    <P>
        Dealing with misinformation is a grand challenge of the information society directed at equipping the computer users with effective tools for identifying and debunking misinformation.
        Current Natural Language Processing (NLP) including its fact-checking research fails to meet the expectations of real-life scenarios.
        In this talk, we show why the past work on fact-checking has not yet led to truly useful tools for managing misinformation, and discuss our ongoing work on more realistic solutions.
        NLP systems are expensive in terms of financial cost, computation, and manpower needed to create data for the learning process.
        With that in mind, we are pursuing research on <strong>detection</strong> of emerging misinformation topics to focus human attention on the most harmful, novel examples.
        Automatic methods for claim <strong>verification</strong> rely on large, high-quality datasets.
        To this end, we have constructed two corpora for fact checking, considering larger evidence documents and pushing the state of the art closer to the reality of combating misinformation.
        We further compare the capabilities of automatic, NLP-based approaches to what human fact checkers actually do, uncovering critical research directions for the future.
        To edify false beliefs, we are collaborating with cognitive scientists and psychologists to automatically detect and respond to attitudes of vaccine hesitancy, encouraging anti-vaxxers to change their minds with effective <strong>communication</strong> strategies.
      </P>

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
  }
`;

export const Head: HeadFC<Props> = ({ data }) => (
  <Seo
    title={TITLE}
    description="One-day workshop co-located with KI-2022 concerned with transforming text data between structured and unstructured representations."
  />
);

export default Page;
