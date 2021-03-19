import { AdjustmentsOutline, BellOutline, Calendar, PlusOutline, Users } from "heroicons-react";
import React from "react";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

interface UpdateCardProps {
  type?: "active" | "default" | "update";
}

const UpdateCard: React.FC<UpdateCardProps> = ({ type = "default" }) => {
  return (
    <div className={`space-y-5 rounded-2xl p-5 ${type === "active" ? "bg-[#F8FAFF]" : ""}`}>
      <Avatar />
      <div>
        <h2
          className={`text-2xl ${
            type === "active" ? "text-primary-500" : "text-gray-800"
          } font-bold`}
        >
          Trivia Pug
        </h2>
        <p className="text-gray-500">
          Learn about the features of Contest Pug through a fun, trivia based competiton!
        </p>
      </div>
      {type !== "update" && (
        <div className="flex items-center space-x-4 text-slate-dark">
          <div className="flex items-center">
            <Calendar size={18} className="mr-2" />
            <p>In 2 Days</p>
          </div>
          <div className="flex items-center">
            <Users size={18} className="mr-2" />
            <p>1.2K participants</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="py-2 flex items-center justify-between w-full">
        <Input themeSize="lg" placeholder="Search for contests or communities" search />
        <div className="flex items-center space-x-2">
          <Button icon={<PlusOutline />} rounded size="sm" />
          <Button
            icon={<BellOutline className="text-slate-dark" />}
            rounded
            color="default"
            size="sm"
          />
          <Button color="default" left={<AdjustmentsOutline size={18} />}>
            Filter
          </Button>
        </div>
      </div>
      <div className="space-y-5">
        <UpdateCard />
        <UpdateCard type="active" />
        <UpdateCard type="update" />
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Dashboard);
