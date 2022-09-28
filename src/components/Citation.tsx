import {
  Button,
  Code,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
// @ts-ignore
import { plugins as citePlugins } from "@citation-js/core";
import React from "react";
import ButtonLink from "./ButtonLink";
import Icon from "./Icon";
require("@citation-js/plugin-bibtex");

interface Author {
  given: string;
  family: string;
}

export interface Props {
  fileUrl?: string;
  author: Array<Author>;
  title: string;
  DOI?: string;
  URL?: string;
  container_title?: string;
  event_title?: string;
  page?: string;
  volume: string;
  publisher: string;
  issued?: {
    date_parts: Array<Array<number>>;
  };
  collection_title?: string;
  publisher_place?: string;
  citation_key: string;
  type: string;
  editor: {
    given: string;
    family: string;
  };
}

const Citation: React.FC<Props> = (props) => {
  const {
    isOpen: isBibtexOpen,
    onOpen: openBibtex,
    onClose: closeBibtex,
  } = useDisclosure();
  const formatAuthor = (author: Author) =>
    `${author.family} ${author.given.substring(0, 1)}`;

  let journal: React.ReactNode | undefined = undefined;

  if (props.collection_title && props.container_title) {
    journal = (
      <>
        {props.container_title}&nbsp;
        <em>({props.collection_title})</em>
      </>
    );
  } else if (props.collection_title ?? props.container_title) {
    journal = <em>{props.collection_title ?? props.container_title}</em>;
  }

  return (
    <Stack spacing={1}>
      <Heading as="h3" size="md">
        {props.title}
      </Heading>
      <Text sx={{ fontWeight: "semibold", fontVariantCaps: "small-caps" }}>
        {props.author.map(formatAuthor).join(", ")}
      </Text>
      {journal && <Text>{journal}</Text>}
      <Stack direction="row">
        {props.fileUrl && (
          <ButtonLink href={props.fileUrl} icon="file-pdf">
            PDF
          </ButtonLink>
        )}
        {props.DOI && (
          <ButtonLink href={`https://doi.org/${props.DOI}`} icon="globe">
            DOI
          </ButtonLink>
        )}
        {!props.DOI && props.URL && (
          <ButtonLink href={props.URL} icon="globe">
            Website
          </ButtonLink>
        )}
        <Button onClick={openBibtex} leftIcon={<Icon name="code" />}>
          BibTeX
        </Button>
      </Stack>
      <BibtexModal
        isOpen={isBibtexOpen}
        onClose={closeBibtex}
        citation={props}
      />
    </Stack>
  );
};

interface BibtexModalProps {
  isOpen: boolean;
  onClose: () => void;
  citation: Props;
}

const BibtexModal: React.FC<BibtexModalProps> = ({
  isOpen,
  onClose,
  citation,
}) => {
  const toast = useToast();

  // Remove null values as formatting with citation-js will fail otherwise
  let cleanCitation = Object.fromEntries(
    Object.entries(citation).filter(([_, v]) => v !== null && v !== undefined)
  );
  // Convert underscores in object keys to hyphens since citation-js expects that
  cleanCitation = JSON.parse(
    JSON.stringify(cleanCitation).replaceAll(/"[a-z_\-]+":/g, (match) =>
      match.replace("_", "-")
    )
  );

  let bibtex: string = citePlugins.output
    .format("bibtex", [cleanCitation])
    .trim();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{citation.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Code
            display="block"
            whiteSpace="pre"
            overflow="scroll"
            borderRadius={5}
            padding={2}
            children={bibtex}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            leftIcon={<Icon name="copy" />}
            onClick={() => {
              navigator.clipboard.writeText(bibtex);
              onClose();
              toast({
                title: "Copied to clipboard",
                status: "success",
                duration: 2000,
                isClosable: false,
              });
            }}
          >
            Copy to Clipboard
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Citation;
