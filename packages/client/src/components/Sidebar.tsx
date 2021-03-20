import { useApolloClient } from "@apollo/client";
import {
  Adjustments,
  AdjustmentsOutline,
  ChartSquareBar,
  ChartSquareBarOutline,
  Chat,
  ChatOutline,
  DocumentSearch,
  DocumentSearchOutline,
  Library,
  LibraryOutline,
  Plus,
  PlusOutline,
} from "heroicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useMedia from "use-media";
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
      normal: <LibraryOutline size={20} />,
      active: <Library size={20} />,
    },
  },
  explore: {
    name: "Explore",
    url: "/explore",
    icon: {
      normal: <DocumentSearchOutline size={20} />,
      active: <DocumentSearch size={20} />,
    },
  },
  competitions: {
    name: "Competitions",
    url: "/competitions",
    icon: {
      normal: <ChartSquareBarOutline size={20} />,
      active: <ChartSquareBar size={20} />,
    },
  },
  messages: {
    name: "Direct Messages",
    url: "/messages",
    icon: {
      normal: <ChatOutline size={20} />,
      active: <Chat size={20} />,
    },
  },
  integrations: {
    name: "Integrations",
    url: "/integrations",
    icon: {
      normal: <AdjustmentsOutline size={20} />,
      active: <Adjustments size={20} />,
    },
  },
  create: {
    name: "Create Contest",
    url: "/create",
    icon: {
      normal: <PlusOutline size={20} />,
      active: <Plus size={20} />,
    },
  },
};

const SidebarLink: React.FC<{ name: keyof typeof links; active?: boolean }> = ({
  name,
  active,
}) => {
  const router = useRouter();
  const minimize = useMedia({ minWidth: "850px" });
  active ||= links[name].url === router.pathname;

  return (
    <Link href={links[name].url}>
      <a
        className={`flex items-center rounded-full tracking-tight font-display text-[15.5px] ${
          active
            ? "bg-primary-100 text-primary-500 hover:text-primary-600 font-semibold"
            : "text-gray-500 hover:text-slate-dark font-medium"
        } ${!minimize ? "w-12 h-12 justify-center" : "px-5 py-3"}`}
      >
        {links[name].icon.normal}
        {minimize && <div className="ml-2">{links[name].name}</div>}
      </a>
    </Link>
  );
};

export const Sidebar: React.FC<SidebarProps> = () => {
  const cache = useApolloClient();
  const { data: me } = useMeQuery();
  const showSidebar = useMedia({ minWidth: "850px" });

  return (
    <nav
      className={`${
        showSidebar ? "max-w-72 lg:max-w-xs px-5 py-8" : "w-auto p-3 items-center"
      } flex w-full h-full bg-white flex-col justify-between `}
    >
      <div className={!showSidebar ? "flex flex-col items-center" : undefined}>
        <Link href="/">
          <a className={!showSidebar ? "mt-5 mb-2" : undefined}>
            <img src={`/logo${showSidebar ? "" : "-icon"}.svg`} alt="Contest Pug" />
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
        openButton={<Avatar data={me?.me} clickable minimize={!showSidebar} />}
        offset={[0, 16]}
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
