import { Story } from "@storybook/react";
import React from "react";
import { Input } from "../components/Input";
import { toBoolean } from "./utils/toBoolean";
import { toEnum } from "./utils/toEnum";

export default {
  title: "Input",
  argTypes: {},
};

const TheInput: Story = ({ themeSize = "sm", ...props }) => {
  return <Input placeholder="Type something" themeSize={themeSize} {...props} />;
};

export const Primary = TheInput.bind({});

Primary.argTypes = {
  search: toBoolean(),
  themeSize: toEnum(["sm", "md", "lg"]),
};
