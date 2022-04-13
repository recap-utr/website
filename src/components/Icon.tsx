import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { IconName } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Icon: React.FC<{ name: IconName | "github" }> = ({ name }) => {
  if (name === "github") {
    return <FontAwesomeIcon icon={faGithub} />;
  } else {
    return <FontAwesomeIcon icon={["fas", name]} />;
  }
};

export default Icon;
