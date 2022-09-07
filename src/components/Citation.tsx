import { Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Link from "./Link";

export interface Props {
  author: Array<{
    given: string;
    family: string;
  }>;
  title: string;
  DOI?: string;
  URL?: string;
  container_title?: string;
  page?: string;
  volume: string;
  publisher: string;
  issued?: {
    date_parts: Array<Array<number>>;
  };
  collection_title?: string;
  publisher_place?: string;
  citation_key: string;
}

const Citation: React.FC<Props> = (props) => {
  const url = props.DOI ? `https://doi.org/${props.DOI}` : props.URL;
  const title = (
    <Heading as="h2" size="md">
      {props.title}
    </Heading>
  );
  const year = props.issued && <>{props.issued.date_parts[0][0]}</>;
  const page = props.page && <>{props.page}</>;
  const location = props.publisher_place && <>{props.publisher_place}</>;

  let journal = undefined;

  if (props.collection_title) {
    journal = <em>{props.collection_title}</em>;
  } else if (props.container_title) {
    journal = <em>{props.container_title}</em>;
  }

  return (
    <Stack spacing={1}>
      {url ? <Link href={url}>{title}</Link> : <>{title}</>}
      <Text sx={{ fontWeight: "semibold", fontVariantCaps: "small-caps" }}>
        {props.author
          .map((author) => `${author.family} ${author.given.substring(0, 1)}`)
          .join(", ")}
      </Text>
      <Text>
        {([year, journal, page, location] as Array<React.ReactNode>)
          .filter((x) => x)
          .reduce((prev, next) => [prev, ", ", next])}
      </Text>
      {props.DOI && (
        <Text>
          DOI: <Link href={`https://doi.org/${props.DOI}`}>{props.DOI}</Link>
        </Text>
      )}
    </Stack>
  );
};

export default Citation;
