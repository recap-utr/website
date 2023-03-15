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
  Heading,
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

interface MenuEntryNode {
  url?: string;
  title: string;
  icon?: IconName;
  iconPrefix?: IconPrefix;
}

interface MenuEntryProps {
  node: MenuEntryNode;
  onClick: () => void;
  currentSlug: string;
}

interface StaticQuery {
  entries: {
    nodes: Array<MenuEntryNode>;
  };
}

const MenuEntry: React.FC<MenuEntryProps> = ({
  node,
  onClick,
  currentSlug,
}) => {
  if (!node.url) {
    return (
      <Heading pt={3} as="span" size="sm">
        {node.icon && (
          <>
            <Icon
              icon={{
                iconName: node.icon,
                prefix: node.iconPrefix ?? "fas",
              }}
            />
            &nbsp;
          </>
        )}
        {node.title}
      </Heading>
    );
  }

  return (
    <Link _hover={{ textDecoration: "none" }} onClick={onClick} href={node.url}>
      <Button
        isActive={withSlash(currentSlug) === withSlash(node.url)}
        width="full"
        justifyContent="left"
        leftIcon={
          node.icon && (
            <Icon
              icon={{
                iconName: node.icon,
                prefix: node.iconPrefix ?? "fas",
              }}
            />
          )
        }
      >
        {node.title}
      </Button>
    </Link>
  );
};

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
        {entries.nodes.map((node, key) => (
          <MenuEntry
            node={node}
            key={key}
            onClick={onClick}
            currentSlug={currentSlug}
          />
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
