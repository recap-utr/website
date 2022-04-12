import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Img,
  Stack,
} from "@chakra-ui/react";
import { IconName } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Icon from "./Icon";
import Link from "./Link";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

interface StaticQuery {
  entries: {
    nodes: Array<{
      url: string;
      title: string;
      icon: IconName;
    }>;
  };
}

const SidebarContent: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  const currentSlug = useLocation().pathname;

  const { entries } = useStaticQuery(graphql`
    query {
      entries: allMenuEntriesYaml {
        nodes {
          title
          icon
          url
        }
      }
    }
  `) as StaticQuery;

  return (
    <Stack spacing={5} position="relative">
      <Img
        background="white"
        borderRadius={9999}
        src="/logo.svg"
        alt="Logo of the project"
      />
      <Stack position="relative">
        {entries.nodes.map((entry, key) => (
          <Link
            props={{
              _hover: { textDecoration: "none" },
              onClick: onClick,
            }}
            key={key}
            href={entry.url}
          >
            <Button
              isActive={currentSlug === entry.url}
              isFullWidth
              justifyContent="left"
              leftIcon={<Icon name={entry.icon} />}
            >
              {entry.title}
            </Button>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

const DesktopSidebar: React.FC<Props> = ({}) => (
  <Box gridArea="sidebar" display={{ base: "none", md: "block" }}>
    <SidebarContent onClick={() => {}} />
  </Box>
);

const MobileSidebar: React.FC<Props> = ({ isOpen, toggle }) => (
  <Drawer isOpen={isOpen} placement="left" onClose={toggle}>
    <DrawerOverlay>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Navigation</DrawerHeader>
        <DrawerBody>
          <SidebarContent onClick={toggle} />
        </DrawerBody>
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
);

const Sidebar: React.FC<Props> = (props) => (
  <>
    <DesktopSidebar {...props} />
    <MobileSidebar {...props} />
  </>
);

export default Sidebar;
