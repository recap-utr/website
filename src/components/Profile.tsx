import { Box, Heading, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Icon from "./Icon";

export interface Props {
  name: string;
  email: string;
  // website?: string;
  avatar: any;
  affiliation: string;
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
      <SimpleGrid columns={2} gap={5}>
        {avatarImage && (
          <Box>
            <GatsbyImage
              imgStyle={{ borderRadius: 9999 }}
              image={avatarImage}
              alt={name}
            />
          </Box>
        )}
        <Stack direction="column">
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
          <Text>
            <Icon name="building" />
            &nbsp;
            {affiliation}
          </Text>
        </Stack>
      </SimpleGrid>
    </Box>
  );
};

export default Profile;
