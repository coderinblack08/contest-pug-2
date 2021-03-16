import React from "react";
import { Provider } from "../components/Provider";

const Dashboard: React.FC = () => {
  return (
    <Provider>
      <h1>Hello World!</h1>
    </Provider>
  );
};

export default Dashboard;
