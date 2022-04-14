import { Tag as ChakraTag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { IconName } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Icon from "./Icon";

interface Props {
  icon?: IconName;
}

const Tag: React.FC<Props> = ({ icon, children }) => (
  <ChakraTag size="lg">
    {icon && <TagLeftIcon as={() => <Icon name={icon} />} />}
    <TagLabel>{children}</TagLabel>
  </ChakraTag>
);

export default Tag;
