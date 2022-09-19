import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import React from "react";

const isExternal = (url: string) => {
  try {
    return new URL(url).origin !== location.origin;
  } catch {}

  if (url.startsWith("/static")) {
    return true;
  }

  return false;
};

const Link: React.FC<ChakraLinkProps> = ({ href, children, ...props }) => {
  if (href === undefined) {
    return <></>;
  }

  if (isExternal(href)) {
    return (
      <ChakraLink {...props} href={href} isExternal>
        {children}
      </ChakraLink>
    );
  } else if (href.startsWith("#")) {
    return (
      <ChakraLink {...props} href={href}>
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
