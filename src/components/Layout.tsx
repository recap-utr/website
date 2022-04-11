import { Box, Container, Grid, Heading } from "@chakra-ui/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Seo } from "./Seo";
import Sidebar from "./Sidebar";

library.add(fas);

interface Props {
  title: string;
}

const Layout: React.FC<Props> = ({ title, children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Seo title={title} />
      <Grid templateAreas="'header' 'main' 'footer'" gap={5}>
        <Header onShowSidebar={toggleSidebar} />
        <Container maxW="container.lg" gridArea="main">
          <Grid
            templateAreas="'sidebar content'"
            templateColumns="2fr 10fr"
            gap={10}
            display={{ base: "block", md: "grid" }}
          >
            <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
            <Box as="main" gridArea="content">
              <Heading as="h1" marginBottom={4} size="2xl">
                {title}
              </Heading>
              {children}
            </Box>
          </Grid>
        </Container>
        <Footer />
      </Grid>
    </>
  );
};

export default Layout;
