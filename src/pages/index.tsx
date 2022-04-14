import { graphql } from "gatsby";
import { ImageDataLike } from "gatsby-plugin-image";
import React from "react";
import { A, H2, P } from "../components/BodyComponents";
import Layout from "../components/Layout";
import Profiles from "../components/Profiles";

interface Props {
  data: {
    members: {
      nodes: Array<{
        avatar: ImageDataLike;
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

const Page: React.FC<Props> = ({ data }) => (
  <Layout
    title="ReCAP Trier University"
    description="Research project at Trier University that is funded by DFG and concerned with building an argumentation machine."
  >
    {/* prettier-ignore */}
    <P>
      The ReCaP project follows the vision of future argumentation engines that support scientists, journalistic writers as well as human decision makers to get a comprehensive overview of current arguments and opinions on a given topic as well as to develop personal, informed opinions.
      Such argumentation engines automatically identify available sources of information on the Web, especially argumentative texts and fakes, that are relevant to the topic at hand.
      Unlike existing search engines, which operate primarily on a textual level, such argumentation engines are based on reasoning at a knowledge level formed by arguments and argumentation structures.
      For a given context, they support the deliberation of arguments and counterarguments for a given issue based on current opinions and facts on the Internet.
      Furthermore, the synthesis of new argumentations is supported by the analogy-based transfer of arguments and argumentation structures from similar, related contexts and topics.
      The ReCAP project aims to make an important contribution to the realization of this vision through a research program that is linked to the other projects of the RATIO priority program.
      The focus is on the novel contributions and confluence of methods from the fields of Information Retrieval (IR) and Knowledge Representation and Reasoning (RI), especially case-based reasoning.
      The goal is to develop methods capable of capturing arguments in a robust and scalable manner, contextualizing and aggregating arguments, and making them available to a user.
      In order to develop a comprehensive understanding of the potential future applications of argumentation engines in the early stages of the project and to focus the methodological and experimental research work, we have integrated competent application partners from the field of political science and communication studies into the project.
      With them, we are developing professionally annotated corpora and elaborating various use cases for deliberation and synthesis as a gold standard, which will also be made available to the other projects in the priority program for benchmarking.
    </P>

    <H2>Funding</H2>
    {/* prettier-ignore */}
    <P>
      The ReCAP project is a joint project between the Chairs of <A href="https://www.uni-trier.de/universitaet/fachbereiche-faecher/fachbereich-iv/faecher/informatikwissenschaften/professuren/wirtschaftsinformatik-2/">Business Information Systems (Prof. Dr. Bergmann)</A> and <A href="https://www.uni-trier.de/universitaet/fachbereiche-faecher/fachbereich-iv/faecher/informatikwissenschaften/professuren/datenbanken-und-informationssysteme/">Databases and Information Systems (Prof. Schenkel)</A> and is funded by the <A href="https://www.dfg.de">German Research Foundation (DFG)</A> within the <A href="http://www.spp-ratio.de">priority program SPP 1999 (Robust Argumentation Machines)</A>.
    </P>

    <H2>Team</H2>
    <Profiles profiles={data.members.nodes} />
  </Layout>
);

export const query = graphql`
  query {
    members: allRecapMembersYaml {
      nodes {
        avatar {
          childImageSharp {
            gatsbyImageData(width: 300, height: 300)
          }
        }
        email
        name
      }
    }
  }
`;

export default Page;
