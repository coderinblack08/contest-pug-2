import {
  ChartSquareBar,
  ChartSquareBarOutline,
  Chat,
  ChatOutline,
  DocumentSearch,
  DocumentSearchOutline,
  Library,
  LibraryOutline,
} from "heroicons-react";
import Link from "next/link";
import React from "react";
import { useTokenStore } from "../store/auth";
import { Avatar } from "./Avatar";
import { Dropdown, DropdownDivider, DropdownItem, DropdownLabel } from "./Dropdown";
import { useApolloClient } from "@apollo/client";

interface SidebarProps {
  path: string;
}

const links = {
  dashboard: {
    name: "Dashboard",
    url: "/",
    icon: {
      normal: <LibraryOutline size={20} className="mr-2.5" />,
      active: <Library size={20} className="mr-2.5" />,
    },
  },
  explore: {
    name: "Explore",
    url: "/explore",
    icon: {
      normal: <DocumentSearchOutline size={20} className="mr-2.5" />,
      active: <DocumentSearch size={20} className="mr-2.5" />,
    },
  },
  competitions: {
    name: "Competitions",
    url: "/competitions",
    icon: {
      normal: <ChartSquareBarOutline size={20} className="mr-2.5" />,
      active: <ChartSquareBar size={20} className="mr-2.5" />,
    },
  },
  messages: {
    name: "Direct Messages",
    url: "/messages",
    icon: {
      normal: <ChatOutline size={20} className="mr-2.5" />,
      active: <Chat size={20} className="mr-2.5" />,
    },
  },
};

const SidebarLink: React.FC<{ name: keyof typeof links; active?: boolean }> = ({
  name,
  active,
}) => {
  return (
    <Link href={links[name].url}>
      <a
        style={{ fontSize: 16 }}
        className={`flex items-center rounded-full font-medium tracking-tight font-display ${
          active ? "bg-primary-100 text-primary-500" : "text-slate-dark"
        } px-5 py-3`}
      >
        {links[name].icon[active ? "active" : "normal"]}
        {links[name].name}
      </a>
    </Link>
  );
};

export const Sidebar: React.FC<SidebarProps> = () => {
  const cache = useApolloClient();

  return (
    <nav className="flex flex-col justify-between px-5 py-8 max-w-xs w-full h-full">
      <div>
        <Link href="/">
          <a>
            <img src="/logo.svg" alt="Contest Pug" />
          </a>
        </Link>
        <div className="flex flex-col space-y-1.5 mt-4">
          <SidebarLink name="dashboard" active />
          <SidebarLink name="explore" />
          <SidebarLink name="competitions" />
          <SidebarLink name="messages" />
        </div>
      </div>
      <Dropdown openButton={<Avatar />} offset={[0, 16]} placement="top-start" expand>
        <DropdownLabel>Info</DropdownLabel>
        <DropdownItem>Account</DropdownItem>
        <DropdownItem>Preferences</DropdownItem>
        <DropdownDivider />
        <DropdownItem
          onClick={async () => {
            useTokenStore.getState().setTokens({ accessToken: "", refreshToken: "" });
            await cache.resetStore();
          }}
        >
          Logout
        </DropdownItem>
      </Dropdown>
    </nav>
  );
};
