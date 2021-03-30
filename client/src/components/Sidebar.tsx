import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Home, Search, Chart, Chat, Filter, Plus } from "react-iconly";
import { useMeQuery } from "../generated/graphql";
import { useTokenStore } from "../store/auth";
import { Avatar } from "./Avatar";
import { Dropdown, DropdownDivider, DropdownItem, DropdownLabel } from "./Dropdown";

interface SidebarProps {
  path: string;
}

const links = {
  dashboard: {
    name: "Dashboard",
    url: "/",
    icon: {
      normal: <Home size={20} set="curved" stroke="bold" />,
    },
  },
  explore: {
    name: "Explore",
    url: "/explore",
    icon: {
      normal: <Search size={20} set="curved" stroke="bold" />,
    },
  },
  competitions: {
    name: "Competitions",
    url: "/competitions",
    icon: {
      normal: <Chart size={20} stroke="bold" />,
    },
  },
  messages: {
    name: "Direct Messages",
    url: "/messages",
    icon: {
      normal: <Chat size={20} set="curved" stroke="bold" />,
    },
  },
  integrations: {
    name: "Integrations",
    url: "/integrations",
    icon: {
      normal: <Filter size={20} set="curved" stroke="bold" />,
    },
  },
  create: {
    name: "Create Contest",
    url: "/create",
    icon: {
      normal: <Plus size={20} set="curved" stroke="bold" />,
    },
  },
};

const SidebarLink: React.FC<{ name: keyof typeof links; active?: boolean }> = ({
  name,
  active,
}) => {
  const router = useRouter();
  active ||= links[name].url === router.pathname;

  return (
    <div className="relative">
      {/* {active ? (
        <div className="hidden md:block absolute py-1 h-full">
          <div className="rounded-full h-full w-4 bg-primary-500 ml-[-30px]" />
        </div>
      ) : null} */}
      <Link href={links[name].url}>
        <a
          className={`group flex items-center 850:justify-start justify-center transition rounded-2xl tracking-tight font-display ${
            active
              ? "bg-primary-100 text-primary-500 hover:text-primary-600 font-medium"
              : "text-gray-500 hover:text-gray-700 font-medium"
          } w-12 h-12 850:w-full 850:h-auto 850:px-5 850:py-3`}
        >
          <div className="transition transform group-hover:scale-110">
            {links[name].icon.normal}
          </div>
          <div className="ml-3 hidden 850:block">{links[name].name}</div>
        </a>
      </Link>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = () => {
  const cache = useApolloClient();
  const { data: me } = useMeQuery();

  return (
    <nav className="h-screen overflow-y-auto 850:max-w-72 lg:max-w-xs 850:px-5 850:py-8 w-auto p-2.5 items-center 850:items-start flex 850:w-full bg-white flex-col justify-between">
      <div className="flex flex-col items-center 850:block 850:w-full">
        <Link href="/">
          <a className="mt-6 mb-3 850:m-0 pl-3 hidden 850:block">
            <img src="/logo.svg" className={"h-9 850:h-auto"} alt="Contest Pug" />
          </a>
        </Link>
        <div className="grid gap-1.5 mt-4">
          <SidebarLink name="dashboard" />
          <SidebarLink name="explore" />
          <SidebarLink name="competitions" />
          <SidebarLink name="messages" />
          <div className="border-b border-gray-100 my-2" />
          <SidebarLink name="integrations" />
          <SidebarLink name="create" />
        </div>
      </div>
      <Dropdown
        openButton={<Avatar data={me?.me} clickable minimize={850} />}
        placement="top-start"
        expand
      >
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
