import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import React from "react";

const isExternal = (url: string) => {
  try {
    return new URL(url).origin !== location.origin;
  } catch {
    return false;
  }
};

const Link: React.FC<{
  href: string;
  props?: ChakraLinkProps;
}> = ({ href, props, children }) => {
  if (isExternal(href)) {
    return (
      <ChakraLink {...props} href={href} isExternal>
        {children}
      </ChakraLink>
    );
  }

  return (
    <ChakraLink {...props} as={GatsbyLink} to={href}>
      {children}
    </ChakraLink>
  );
};

export default Link;
