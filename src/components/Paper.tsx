import { Text } from "@chakra-ui/react";
import React from "react";
import Icon from "./Icon";
import Link from "./Link";

export interface Props {
  title: string;
  authors: Array<string>;
  slides?: string;
  paper?: string;
  preprint?: string;
}

export const Paper: React.FC<Props> = ({
  title,
  authors,
  slides,
  paper,
  preprint,
}) => {
  const links = [];

  if (paper) {
    links.push(
      <Link href={paper}>
        <Icon icon="file-lines" />
        &nbsp;Published paper
      </Link>
    );
  }

  if (preprint && !paper) {
    links.push(
      <Link href={preprint}>
        <Icon icon="file-lines" />
        &nbsp;Preprint
      </Link>
    );
  }

  if (slides) {
    links.push(
      <Link href={slides}>
        <Icon icon="person-chalkboard" />
        &nbsp;Slides
      </Link>
    );
  }

  return (
    <>
      <Text>{authors.join(", ")}</Text>
      <Text mt={1}>
        <i>{title}</i>
      </Text>
      {links.length > 0 && (
        <Text mt={1}>
          {links.map((link, idx) => (
            <span
              key={idx}
              style={{ marginRight: idx + 1 === links.length ? 0 : 10 }}
            >
              {link}
            </span>
          ))}
        </Text>
      )}
    </>
  );
};

export default Paper;
