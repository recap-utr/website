import {
  Box,
  Button,
  Center,
  Circle,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Img,
  Stack,
} from "@chakra-ui/react";
import { IconName, IconPrefix } from "@fortawesome/fontawesome-common-types";
import { useLocation } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import logo from "../assets/logo.svg";
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
      iconPrefix?: IconPrefix;
    }>;
  };
}

const withSlash = (url: string) => (url.endsWith("/") ? url : `${url}/`);

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
          iconPrefix
          url
        }
      }
    }
  `) as StaticQuery;

  return (
    <Stack spacing={5} position="relative">
      <Center>
        <Circle size={125} background="white" p={2}>
          <Img src={logo} alt="Logo of the project" />
        </Circle>
      </Center>
      <Stack position="relative">
        {entries.nodes.map((entry, key) => (
          <Link
            _hover={{ textDecoration: "none" }}
            onClick={onClick}
            key={key}
            href={entry.url}
          >
            <Button
              isActive={withSlash(currentSlug) === withSlash(entry.url)}
              width="full"
              justifyContent="left"
              leftIcon={
                <Icon
                  icon={{
                    iconName: entry.icon,
                    prefix: entry.iconPrefix ?? "fas",
                  }}
                />
              }
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
