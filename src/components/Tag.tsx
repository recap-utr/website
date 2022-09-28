import { Tag as ChakraTag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import React from "react";
import Icon, { IconProp } from "./Icon";

interface Props extends React.PropsWithChildren {
  icon?: IconProp;
}

const Tag: React.FC<Props> = ({ icon, children }) => (
  <ChakraTag size="lg">
    {icon && (
      <>
        <TagLeftIcon as={() => <Icon icon={icon} />} />
        &nbsp;&nbsp;
      </>
    )}
    <TagLabel>{children}</TagLabel>
  </ChakraTag>
);

export default Tag;
