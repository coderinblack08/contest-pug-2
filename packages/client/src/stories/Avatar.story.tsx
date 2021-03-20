import { Story } from "@storybook/react";
import React from "react";
import { Avatar } from "../components/Avatar";
import { toBoolean } from "./utils/toBoolean";

export default {
  title: "Avatar",
  argTypes: {},
};

const TheAvatar: Story = (props) => {
  return (
    <Avatar
      data={{
        profilePicture:
          "https://lh3.googleusercontent.com/a-/AOh14GgvhsoW1H6FenDHDQYks1rt2OonjD4T44C7evWFJw=s96-c",
        username: "coderinblack",
        displayName: "Kevin Lu",
      }}
      {...props}
    />
  );
};

export const Primary = TheAvatar.bind({});

Primary.argTypes = {
  clickable: toBoolean(),
};
