import { AdjustmentsOutline, BellOutline, PlusOutline } from "heroicons-react";
import React from "react";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { useMeQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Dashboard: React.FC = () => {
  const { data: user } = useMeQuery();
  return (
    <Layout>
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="font-bold text-3xl text-[#1C2C49]">Welcome {user?.me?.displayName}</h1>
          <p className="text-slate-light mt-2">Here are updates from communities you've joined</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button icon={<PlusOutline />} rounded size="sm" />
          <Button
            icon={<BellOutline className="text-slate-dark" />}
            rounded
            color="default"
            size="sm"
          />
          <Button
            color="default"
            left={<AdjustmentsOutline size={18} className="transform rotate-90" />}
          >
            Filter
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Dashboard);
