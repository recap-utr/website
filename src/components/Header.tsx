import { Box, Center, Container, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import Icon from "./Icon";
import Link from "./Link";

interface Props {
  onShowSidebar: () => void;
}

const HeaderContent: React.FC<{}> = () => (
  <Link href="/" _hover={{}}>
    <Heading as="span" size="lg">
      ReCAP Trier University
    </Heading>
  </Link>
);

const MobileHeader: React.FC<Props> = ({ onShowSidebar }) => {
  return (
    <Box display={{ base: "flex", md: "none" }} marginTop={2}>
      <Center flex="1">
        <IconButton
          icon={<Icon icon="bars" />}
          onClick={onShowSidebar}
          aria-label="Show sidebar"
        />
      </Center>
      <Center flex="10">
        <HeaderContent />
      </Center>
      <Box flex="1" />
    </Box>
  );
};

const DesktopHeader: React.FC<{}> = ({}) => {
  return (
    <Center paddingTop={5} display={{ md: "none", lg: "flex" }}>
      {/* <HeaderContent /> */}
    </Center>
  );
};

const Header: React.FC<Props> = ({ onShowSidebar }) => {
  return (
    <Box gridArea="header" bg="primary.600">
      <Container maxW="container.xl" as="header">
        <MobileHeader onShowSidebar={onShowSidebar} />
        <DesktopHeader />
      </Container>
    </Box>
  );
};

export default Header;
