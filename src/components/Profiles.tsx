import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Profile, { Props as ProfileProps } from "./Profile";

interface Props {
  profiles: Array<ProfileProps>;
}

const Profiles: React.FC<Props> = ({ profiles }) => {
  // const maxColumns = profiles.length === 4 || profiles.length === 2 ? 2 : 3;
  const maxColumns = 2;

  return (
    <SimpleGrid
      spacingX={10}
      spacingY={10}
      columns={{ base: 1, sm: 2, lg: maxColumns }}
    >
      {profiles.map((profile, i) => (
        <Profile {...profile} key={i} />
      ))}
    </SimpleGrid>
  );
};

export default Profiles;
