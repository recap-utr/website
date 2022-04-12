import { Center, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Link from "./Link";

const Footer: React.FC<{}> = () => {
  return (
    <Center as="footer" gridArea="footer" bg="primary.600" pt={5} pb={5}>
      <Stack
        spacing={{ base: 1, md: 5 }}
        direction={{ base: "column", md: "row" }}
        textAlign="center"
      >
        <Text>&copy; {new Date().getFullYear()} Trier University</Text>
        <Link href="https://www.uni-trier.de/impressum/">Imprint</Link>
        <Link href="https://www.uni-trier.de/datenschutzerklaerung/">
          Privacy Policy
        </Link>
      </Stack>
    </Center>
  );
};

export default Footer;
