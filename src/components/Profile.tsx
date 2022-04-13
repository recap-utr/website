import { Box, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Icon from "./Icon";

export interface Props {
  name: string;
  email: string;
  // website?: string;
  avatar: any;
  affiliation?: string;
}

const Profile: React.FC<Props> = ({
  name,
  email,
  // website,
  avatar,
  affiliation,
}) => {
  const avatarImage = getImage(avatar);
  return (
    <Box>
      <Stack direction="column" spacing={2}>
        {avatarImage && (
          <Box>
            <GatsbyImage image={avatarImage} alt={name} />
          </Box>
        )}
        <Heading as="h3" size="sm">
          {name}
        </Heading>
        <Text whiteSpace="nowrap">
          <Icon name="envelope" />
          &nbsp;
          <Link whiteSpace="normal" href={`mailto:${email}`}>
            {email}
          </Link>
        </Text>
        {affiliation && (
          <Text>
            <Icon name="building" />
            &nbsp;
            {affiliation}
          </Text>
        )}
      </Stack>
    </Box>
  );
};

export default Profile;
