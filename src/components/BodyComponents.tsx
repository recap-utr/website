import {
  Divider,
  Heading,
  HeadingProps,
  LinkProps,
  ListItem,
  ListProps,
  OrderedList,
  Text,
  TextProps,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";
import Link from "./Link";

export const H2: React.FC<HeadingProps> = (props) => (
  <Heading {...props} mt={10} mb={5} as="h2" size="xl" />
);
export const H3: React.FC<HeadingProps> = (props) => (
  <Heading {...props} mt={8} mb={4} as="h3" size="lg" />
);
export const H4: React.FC<HeadingProps> = (props) => (
  <Heading {...props} mt={6} mb={3} as="h4" size="md" />
);
export const H5: React.FC<HeadingProps> = (props) => (
  <Heading {...props} mt={4} mb={2} as="h5" size="sm" />
);
export const H6: React.FC<HeadingProps> = (props) => (
  <Heading {...props} mt={2} mb={1} as="h6" size="sm" />
);
export const A: React.FC<LinkProps> = ({ children, ...props }) => {
  const href = props.href ? props.href : "#";
  return (
    <Link href={href} props={props}>
      {children}
    </Link>
  );
};
export const P: React.FC<TextProps> = (props) => (
  <Text {...props} mt={2} mb={2} textAlign="justify" />
);
export const Li = ListItem;
export const Ul: React.FC<ListProps> = (props) => (
  <UnorderedList {...props} mt={2} mb={2} stylePosition="outside" pl={5} />
);
export const Ol: React.FC<ListProps> = (props) => (
  <OrderedList {...props} mt={2} mb={2} stylePosition="outside" pl={5} />
);
export const Hr = Divider;
