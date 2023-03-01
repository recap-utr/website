import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import React from "react";

const useGatsbyLink = (url: string) => {
  try {
    new URL(url);
    return false;
  } catch {
    if (url.startsWith("#") || url.startsWith("/static")) {
      return false;
    }

    return true;
  }
};

const Link: React.FC<ChakraLinkProps> = ({ href, children, ...props }) => {
  if (href === undefined) {
    return <></>;
  }

  if (useGatsbyLink(href)) {
    return (
      <ChakraLink {...props} as={GatsbyLink} to={href}>
        {children}
      </ChakraLink>
    );
  }

  return (
    <ChakraLink
      {...props}
      href={href}
      isExternal={!(href.startsWith("#") || href.startsWith("mailto:"))}
    >
      {children}
    </ChakraLink>
  );
};

export default Link;
