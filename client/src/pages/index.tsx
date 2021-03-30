import React from "react";
import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { withApollo } from "../utils/withApollo";

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="px-8 py-6 md:py-10 max-w-7xl mx-auto">
        <Navbar />
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Dashboard);
