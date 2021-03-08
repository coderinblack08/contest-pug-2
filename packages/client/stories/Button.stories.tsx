import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Button, ButtonProps } from "../components/form/Button";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Hello",
};
