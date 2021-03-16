import React from "react";
import { Story } from "@storybook/react";
import { Button, ButtonTheme } from "../components/Button";
import { toEnum } from "./utils/toEnum";
import { toBoolean } from "./utils/toBoolean";
import { EmojiHappyOutline } from "heroicons-react";

export default {
  title: "Button",
  argTypes: { onClick: { action: "clicked" } },
};

const TheButton: Story = ({ children = "Primary Button", ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export const Primary = TheButton.bind({});
export const Secondary = TheButton.bind({});
export const Icon = TheButton.bind({});

Secondary.args = {
  secondary: true,
};

Icon.args = {
  prefix: <EmojiHappyOutline size={20} />,
};

Icon.argTypes = Secondary.argTypes = Primary.argTypes = {
  color: toEnum(Object.keys(ButtonTheme.colors)),
  size: toEnum(Object.keys(ButtonTheme.sizes)),
  loading: toBoolean(),
};
