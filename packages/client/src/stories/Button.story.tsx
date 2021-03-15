import React from "react";
import { Story } from "@storybook/react";
import { Button, ButtonTheme } from "../components/Button";
import { toEnum } from "./utils/toEnum";

export default {
  title: "Button",
  argTypes: { onClick: { action: "clicked" } },
};

const TheButton: Story = ({ children = "Primary Button", ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export const Primary = TheButton.bind({});
export const Secondary = TheButton.bind({});

Secondary.args = {
  secondary: true,
};

Secondary.argTypes = Primary.argTypes = {
  color: toEnum(Object.keys(ButtonTheme.colors)),
  size: toEnum(Object.keys(ButtonTheme.sizes)),
};
