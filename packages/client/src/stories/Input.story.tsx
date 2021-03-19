import { Story } from "@storybook/react";
import React from "react";
import { Input } from "../components/Input";

export default {
  title: "Input",
  argTypes: {},
};

const TheInput: Story = () => {
  return <Input />;
};

export const Primary = TheInput.bind({});

Primary.argTypes = {};
