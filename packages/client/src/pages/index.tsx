import { BellOutline, Calendar, PlusOutline, Users } from "heroicons-react";
import React from "react";
import useMedia from "use-media";
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
      <Avatar
        data={{
          profilePicture:
            "https://lh3.googleusercontent.com/a-/AOh14GgvhsoW1H6FenDHDQYks1rt2OonjD4T44C7evWFJw=s96-c",
          username: "coderinblack",
          displayName: "Kevin Lu",
        }}
      />
      <div>
        <h2
          className={`text-2xl ${
            type === "active" ? "text-primary-500" : "text-gray-800"
          } font-bold`}
        >
          Trivia Pug
        </h2>
        <p className="text-gray-500">
          Learn about the features of Contest Pug through a fun, trivia based competition!
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
      <div className="px-8 py-6 md:py-10 max-w-7xl mx-auto">
        <div
          className={`${
            useMedia({ minWidth: "925px" })
              ? "flex-row items-center justify-between"
              : "flex-col space-y-4"
          } py-2 bg-white flex w-full`}
        >
          <Input
            name="search"
            themeSize={useMedia({ minWidth: "925px" }) ? "lg" : "full"}
            placeholder="Search for contests or communities"
            search
          />
          <div className="flex items-center space-x-2 ml-2">
            <Button icon={<PlusOutline />} rounded size="sm" href="/create" />
            <Button
              icon={<BellOutline className="text-slate-dark" />}
              rounded
              color="default"
              size="sm"
            />
            <Button color="default"> Filter</Button>
          </div>
        </div>
        <div className="space-y-5 max-w-3xl mt-2">
          <UpdateCard />
          <UpdateCard type="active" />
          <UpdateCard type="update" />
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Dashboard);
