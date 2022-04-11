import { Box, Text, Wrap } from "@chakra-ui/react";
import React from "react";
import Link from "./Link";

const Footer: React.FC<{}> = () => {
  return (
    <Box as="footer" gridArea="footer" bg="primary.600" pt={5} pb={5}>
      <Wrap spacing={5} justify="center">
        <Text>&copy; {new Date().getFullYear()} Trier University</Text>
        <Link
          chakraProps={{ isExternal: true }}
          href="https://www.uni-trier.de/impressum/"
        >
          Imprint
        </Link>
        <Link
          chakraProps={{ isExternal: true }}
          href="https://www.uni-trier.de/datenschutzerklaerung/"
        >
          Privacy Policy
        </Link>
      </Wrap>
    </Box>
  );
};

export default Footer;
