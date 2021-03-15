import { Story } from "@storybook/react";
import { LogoutOutline } from "heroicons-react";
import React from "react";
import { Button } from "../components/Button";
import { Dropdown, DropdownItem } from "../components/Dropdown";

export default {
  title: "Dropdown",
  argTypes: {},
};

const TheDropdown: Story = () => {
  return (
    <Dropdown openButton={<Button>Open</Button>}>
      <DropdownItem>Preferences</DropdownItem>
      <DropdownItem>Account</DropdownItem>
      <DropdownItem prefix={<LogoutOutline size={20} />} spacing={1}>
        Logout
      </DropdownItem>
    </Dropdown>
  );
};

export const Primary = TheDropdown.bind({});

Primary.argTypes = {};
