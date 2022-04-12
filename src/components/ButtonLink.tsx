import { Button, ThemeTypings } from "@chakra-ui/react";
import { IconName } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Icon from "./Icon";
import Link from "./Link";

interface Props {
  href: string;
  icon?: IconName;
  color?: ThemeTypings["colorSchemes"];
}

const ButtonLink: React.FC<Props> = ({ href, color, icon, children }) => (
  <Link
    props={{
      _hover: { textDecoration: "none" },
    }}
    href={href}
  >
    <Button colorScheme={color} leftIcon={icon && <Icon name={icon} />}>
      {children}
    </Button>
  </Link>
);

export default ButtonLink;
