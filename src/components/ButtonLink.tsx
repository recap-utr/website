import { Button, ThemeTypings } from "@chakra-ui/react";
import React from "react";
import Icon, { IconProp } from "./Icon";
import Link from "./Link";

interface Props extends React.PropsWithChildren {
  href: string;
  icon?: IconProp;
  color?: ThemeTypings["colorSchemes"];
}

const ButtonLink: React.FC<Props> = ({ href, color, icon, children }) => (
  <Link _hover={{ textDecoration: "none" }} href={href}>
    <Button colorScheme={color} leftIcon={icon && <Icon icon={icon} />}>
      {children}
    </Button>
  </Link>
);

export default ButtonLink;
