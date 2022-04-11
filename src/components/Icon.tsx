import { IconName } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Icon: React.FC<{ name: IconName }> = ({ name }) => (
  <FontAwesomeIcon icon={["fas", name as IconName]} />
);

export default Icon;
