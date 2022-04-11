import React from "react";
import { P } from "../components/BodyComponents";
import Layout from "../components/Layout";

const NotFoundPage = () => {
  return (
    <Layout title="Not Found">
      <P>The page you requested has not been found.</P>
    </Layout>
  );
};

export default NotFoundPage;
