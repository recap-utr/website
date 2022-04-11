import { Grid } from "@chakra-ui/react";
import React from "react";

const Gallery: React.FC = ({ children }) => (
  <Grid
    gap={5}
    templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
  >
    {children}
  </Grid>
);

export default Gallery;
