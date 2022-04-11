import { SimpleGrid } from "@chakra-ui/react";
import type { ImageDataLike } from "gatsby-plugin-image";
import React from "react";
import Profile from "./Profile";

interface Props {
  profiles: Array<{
    avatar: ImageDataLike;
    affiliation: string;
    email: string;
    name: string;
  }>;
}

const Profiles: React.FC<Props> = ({ profiles }) => {
  return (
    <SimpleGrid spacingX={10} spacingY={20} columns={{ base: 1, lg: 2 }}>
      {profiles.map((profile) => (
        <Profile {...profile} />
      ))}
    </SimpleGrid>
  );
};

export default Profiles;
