import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { ImageDataLike, StaticImage } from "gatsby-plugin-image";
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
      <Alert mt={10} mb={5} status="info">
        <AlertIcon />
        <Box>
          <AlertTitle>Keynote confirmed</AlertTitle>
          <AlertDescription>
            We are excited to share that Prof. Dr. Chris Reed will hold a
            keynote at our workshop. The topic of the talk will be published
            soon, so stay tuned for updates!
          </AlertDescription>
        </Box>
      </Alert>
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
      <Accordion
        allowToggle
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
      <H2>Important Dates</H2>
      <Table
        props={{ variant: "striped", size: "sm" }}
        caption="All dates are calculated at 11:59 pm UTC"
        columns={["Date", "Description"]}
        rows={[
          ["May 10, 2023", "Paper submission"],
          ["June 12, 2023", "Paper notification"],
          ["June 26, 2023", "Camera-ready copy"],
          ["July 17, 2023", "Workshop date"],
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
      <H3>Submission Information</H3>
      {/* prettier-ignore */}
      <P>
        The submission of the papers should be in accordance to the CEUR-WS style and have to be submitted via EasyChair.
        The workshop is running a single-blind review process.
        Authors can submit the following types of papers:
      </P>
      <Ul>
        <Li>Full Paper (10–16 pages, including references)</Li>
        <Li>Short Paper (5–9 pages, including references)</Li>
      </Ul>
      <P>
        At least one author of each accepted paper must register for the
        workshop and present the contribution.
      </P>
      <Stack direction={{ base: "column", sm: "row" }} mt={5} mb={5}>
        <ButtonLink color="blue" icon="circle-check" href="#">
          Submit (coming soon)
        </ButtonLink>
        <ButtonLink
          color="blue"
          icon="book"
          href={data.paperTemplate.publicURL}
        >
          Paper template
        </ButtonLink>
        <ButtonLink icon="section" href="https://ceur-ws.org/HOWTOSUBMIT.html">
          CEUR guidelines
        </ButtonLink>
        <ButtonLink
          icon="circle-info"
          href="https://www.comp.rgu.ac.uk/ICCBR23/"
        >
          ICCBR website
        </ButtonLink>
      </Stack>
      <H2>Preliminary Workshop Schedule</H2>
      <Table
        props={{ variant: "striped", size: "sm" }}
        columns={["Start", "End", "Event"]}
        rows={[
          ["09:00", "09:10", <b>Opening</b>],
          ["09:10", "11:00", <b>Session 1</b>],
          ["11:00", "11:30", <>Coffee break</>],
          [
            "11:30",
            "13:00",
            <b>
              <A href="#keynote">Keynote by Prof. Dr. Chris Reed</A> with
              discussion
            </b>,
          ],
          ["13:00", "14:00", <>Lunch break</>],
          ["14:00", "15:30", <b>Session 2 with panel discussion</b>],
          ["15:30", "16:00", <>Coffee break</>],
          ["16:00", "17:30", <b>Poster session and socializing</b>],
        ]}
      />
      <H2 id="keynote">Keynote by Prof. Dr. Chris Reed</H2>
      <Stack spacing={10} direction={{ base: "column", md: "row" }}>
        <Center flex="0 0 256px">
          <StaticImage
            width={256}
            height={256}
            transformOptions={{ cropFocus: "centre" }}
            src="../../assets/avatars/reed.jpg"
            alt="Prof. Dr. Chris Reed"
          />
        </Center>
        {/* prettier-ignore */}
        <P>
          Chris Reed is Professor of Computer Science and Philosophy at the University of Dundee in Scotland, where he heads the <A href="https://www.arg.tech">Centre for Argument Technology</A>.
          Chris has been working at the overlap between argumentation theory and artificial intelligence for two decades and specialises in the theory, practice and commercialisation of argument technology.
          He has won over £6.5m of funding from government, charity and commercial sources, has over 200 peer-reviewed papers in the area including five books, and has served as a director of several technology companies.
          {/* He has also been instrumental in the development of the Argument Interchange Format (AIF), an international standard for computational work in the area;
          he is spear-heading the major engineering effort behind the Argument Web;
          and he is a founding editor of the Journal of Argument & Computation.
          He also provides evidence to various committees at Westminster and his media appearances and writing have reached an audience in excess of 30 million people. */}
          <H3>Topic: To be Announced</H3>
        </P>
      </Stack>
      {/* prettier-ignore */}
      {/* <H3>Topic: To be Announced</H3> */}
      {/* prettier-ignore */}
      {/* <P>
        To be announced.
      </P> */}
      <H2>Organizing Committee</H2>
      <Profiles profiles={data.organizingCommittee.nodes} />
      <H2>Preliminary Program Committee</H2>
      <Ul>
        {data.programCommittee.nodes.map((member) => (
          <Li key={member.name}>
            {member.name} ({member.affiliation})
          </Li>
        ))}
      </Ul>
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
    programCommittee: allTmg2023ProgramCommitteeYaml {
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
