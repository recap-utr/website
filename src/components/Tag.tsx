import { Tag as ChakraTag, TagLabel } from "@chakra-ui/react";
import { IconName } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Icon from "./Icon";

interface Props {
  icon?: IconName;
}

const Tag: React.FC<Props> = ({ icon, children }) => (
  <ChakraTag size="lg">
    {icon && (
      <>
        <Icon name={icon} />
        &nbsp;
      </>
    )}
    <TagLabel>{children}</TagLabel>
  </ChakraTag>
);

export default Tag;
