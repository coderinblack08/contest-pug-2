import { Story } from "@storybook/react";
import { ChevronDown } from "heroicons-react";
import React from "react";
import { Button } from "../components/Button";
import { Dropdown, DropdownDivider, DropdownItem, DropdownLabel } from "../components/Dropdown";

export default {
  title: "Dropdown",
  argTypes: {},
};

const TheDropdown: Story = () => {
  return (
    <Dropdown openButton={<Button suffix={<ChevronDown size={18} />}>Open</Button>}>
      <DropdownLabel>Info</DropdownLabel>
      <DropdownItem>Preferences</DropdownItem>
      <DropdownItem>Account</DropdownItem>
      <DropdownDivider />
      <DropdownItem>Logout</DropdownItem>
    </Dropdown>
  );
};

export const Primary = TheDropdown.bind({});

Primary.argTypes = {};
