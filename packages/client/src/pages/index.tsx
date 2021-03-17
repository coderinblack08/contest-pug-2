import React from "react";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <h1>Hello World!</h1>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Dashboard);
