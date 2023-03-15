import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";
import React from "react";
import { A, H2, H3, I, Li, P, Ul } from "../../components/BodyComponents";
import ButtonLink from "../../components/ButtonLink";
import Layout from "../../components/Layout";
import Profiles from "../../components/Profiles";
import { Seo } from "../../components/Seo";
import Table from "../../components/Table";
import Tag from "../../components/Tag";
import { Tags } from "../../components/Tags";

const TITLE = "Workshop on Text Mining and Generation (TMG) @ ICCBR 2023";

interface Props {
  organizingCommittee: {
    nodes: Array<{
      avatar: ImageDataLike;
      affiliation: string;
      email: string;
      name: string;
    }>;
  };
  programCommittee: {
    nodes: Array<{
      affiliation: string;
      name: string;
    }>;
  };
  presentations: {
    nodes: Array<{
      publicURL: string;
      name: string;
    }>;
  };
  papers: {
    nodes: Array<{
      publicURL: string;
      name: string;
    }>;
  };
  paperTemplate: {
    publicURL: string;
  };
}

const Page: React.FC<PageProps<Props>> = ({ data }) => {
  // const presentations = Object.fromEntries(
  //   data.presentations.nodes.map((file) => [file.name, file.publicURL])
  // );
  // const papers = Object.fromEntries(
  //   data.papers.nodes.map((file) => [file.name, file.publicURL])
  // );

  return (
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
      <Tags>
        <Tag icon="calendar-alt">July 17, 2023</Tag>
        <Tag icon="clock">Full-day</Tag>
        <Tag icon="info-circle">
          Co-located with{" "}
          <I>
            <A href="https://www.comp.rgu.ac.uk/ICCBR23/">ICCBR 2023</A>
          </I>
        </Tag>
        <Tag icon="location-dot">Aberdeen, Scotland</Tag>
      </Tags>
      {/* prettier-ignore */}
      <P>
        Digital text data is produced across different sources such as social media. Simultaneously, very often only structured data is available.
        Within CBR, cases of the former are usually handled by using methods of Textual CBR, while Process-Oriented CBR addresses on the latter type of data.
        By leveraging their generic research origins, i.e., text mining and text generation approaches, we aim to diminish this gap.
        The target of <I>text mining</I> is to extract (useful) structured information from unstructured text.
        In contrast, <I>text generation</I> attempts to (automatically) create text from structured information or distributed knowledge.
        The goal of the TMG workshop is to bring these two perspectives together by eliciting research paper submissions that aim for applying text mining and generation approach in the context of CBR.
        We welcome any submission from any domain aiming to contribute to to close this gap.
      </P>
      <H2>Important Dates</H2>
      <Table
        props={{ variant: "striped", size: "sm" }}
        caption="All dates are calculated at 11:59 AoE"
        columns={["Date", "Description"]}
        rows={[
          ["May 22, 2023", "Paper submission"],
          ["June 12, 2023", "Paper notification"],
          ["June 26, 2023", "Camera-ready copy"],
          ["July 17, 2023", "Workshop Date"],
        ]}
      />
      <H2>Call for Papers</H2>
      <P>
        We welcome any submissions that deal with transforming the
        representation of data between structured and unstructured formats in
        the context of CBR-based systems: (applied) research papers, theoretical
        papers, user studies or prospective papers. Topics include, but are not
        limited to, the following:
      </P>
      {/* prettier-ignore */}
      <Ul sx={{columns: {base: 1, sm: 2}, columnGap: 25}}>
        <Li>Text mining for argumentation.</Li>
        <Li>Case-based knowledge representation of text.</Li>
        <Li>Similarity-based retrieval and ranking.</Li>
        <Li>Informed similarity measures for structured text.</Li>
        <Li>Generating descriptions for graph-based argument case representations.</Li>
        <Li>Generating case-based explanations for retrieval.</Li>
        <Li>Methods for Explainable CBR.</Li>
        <Li>Ethical aspects of AI for text generation (e.g., mitigating bias or misinformation).</Li>
        <Li>Integration of background knowledge and machine learning.</Li>
        <Li>CBR and knowledge graphs.</Li>
        <Li>Graph-to-text generation with knowledge graphs.</Li>
        <Li>Knowledge graph refinement, particularly featuring text-based signals.</Li>
        <Li>Snippet generation for search results.</Li>
        <Li>CBR for Deep Learning with Text.</Li>
      </Ul>
      <Accordion
        allowToggle
        // borderWidth="medium"
        borderRadius="xl"
        bg={useColorModeValue("teal.100", "teal.900")}
      >
        <AccordionItem border="none">
          <H3>
            <AccordionButton>
              <Box as="b" flex={1} textAlign="left">
                Learn more about the impact of TMG for CBR…
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </H3>
          <AccordionPanel>
            {/* prettier-ignore */}
            <P>
              Text mining (TM) and text generation (TG) are beneficial for most if not all stages of the classical R4-cycle:
              During <I>retrieval</I>, TG can be employed to synthesize a structural representation, making it possible to utilize fine-grained similarity measures, whereas TM may be applied to add an efficient pre-filtering phase based on state-of-the-art natural language processing (NLP) techniques like contextualized embeddings.
              Performing correct adaptations as part of the <I>reuse</I> step is often challenging due to large amount of domain knowledge needed.
              TM/TG can assist here by translating between structured information geared towards computers and natural language that is easily understandable by humans, making knowledge acquisition simpler and more scalable.
              The <I>revision</I> step is often necessary to identify potential faulty cases resulting from ill-implemented solutions but also trend-shifts.
              Providing domains expert with meta information in form of explanations is crucial to secure the utility of systems and their case bases.
              In fact, Explainable CBR (XCBR) is getting increased interest from the CBR community.
              The generation of explanations has become an important tool against the increasing complexity of black-box models.
              TM can be utilized to identify irregular trends in the data, model, or the outputs, while TG can supplement the creation of explanations which in turn facilities informed actions by humans.
            </P>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <H3>Submission Information</H3>
      {/* prettier-ignore */}
      <P>
        The submission of the papers should be in accordance to the CEUR-WS style and have to be submitted via EasyChair.
        The workshop is running a single-blind review process.
        Authors can submit the following types of papers:
      </P>
      <Ul>
        <Li>Full Paper (10–16 pages, excluding references)</Li>
        <Li>Short Paper (5–9 pages, excluding references)</Li>
      </Ul>
      <Stack direction={{ base: "column", sm: "row" }} mt={5} mb={5}>
        {/* <ButtonLink
          color="blue"
          icon="circle-check"
          href="https://easychair.org/conferences/?conf=iccbr2023"
        >
          Submit
        </ButtonLink> */}
        <ButtonLink
          color="blue"
          icon="book"
          href={data.paperTemplate.publicURL}
        >
          Paper Template
        </ButtonLink>
        <ButtonLink icon="section" href="https://ceur-ws.org/HOWTOSUBMIT.html">
          CEUR Guidelines
        </ButtonLink>
      </Stack>
      <H2>Tentiative Workshop Schedule</H2>
      <Table
        props={{ variant: "striped", size: "sm" }}
        columns={["Start", "End", "Event"]}
        rows={[
          ["09:00", "09:10", <b>Opening</b>],
          ["09:10", "10:40", <b>Session 1</b>],
          ["10:40", "11:00", <>Coffee break</>],
          [
            "11:00",
            "12:00",
            <b>
              <i>Optional:</i> Invited talk with discussion
            </b>,
          ],
          ["12:00", "13:00", <>Lunch break</>],
          ["13:00", "14:30", <b>Session 2</b>],
          ["14:30", "14:50", <>Coffee break</>],
          ["14:50", "16:20", <b>Session 3 with panel discussion</b>],
          ["16:20", "16:30", <>Coffee break</>],
          ["16:30", "18:00", <b>Poster session and socializing</b>],
        ]}
      />
      <H2>Organizing Committee</H2>
      <Profiles profiles={data.organizingCommittee.nodes} />
      <H2>Program Committee</H2>
      Currently under construction, we will provide the list of PC members as
      soon as possible.
      {/* <Ul>
        {data.programCommittee.nodes.map((member) => (
          <Li key={member.name}>
            {member.name} ({member.affiliation})
          </Li>
        ))}
      </Ul> */}
    </Layout>
  );
};

export const query = graphql`
  query {
    # presentations: allFile(
    #   filter: { relativeDirectory: { eq: "workshops/tmg-2023/presentations" } }
    # ) {
    #   nodes {
    #     publicURL
    #     name
    #   }
    # }
    # papers: allFile(
    #   filter: { relativeDirectory: { eq: "workshops/tmg-2023/papers" } }
    # ) {
    #   nodes {
    #     publicURL
    #     name
    #   }
    # }

    organizingCommittee: allTmg2023OrganizingCommitteeYaml {
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
    programCommittee: allTmg2023ProgramCommitteeYaml(sort: { name: ASC }) {
      nodes {
        affiliation
        name
      }
    }
    paperTemplate: file(
      sourceInstanceName: { eq: "assets" }
      relativePath: { eq: "workshops/tmg-2023/tmg-2023-ceur-ws.zip" }
    ) {
      publicURL
    }
  }
`;

export const Head: HeadFC<Props> = ({ data }) => (
  <Seo
    title={TITLE}
    description="One-day workshop at ICCBR 2023 concerned with transforming text data between structured and unstructured representations."
  />
);

export default Page;
