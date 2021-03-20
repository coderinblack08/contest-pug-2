import { useRouter } from "next/router";
import React from "react";
import { Sidebar } from "./Sidebar";

export const Layout: React.FC = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <div className="flex items-start w-screen h-screen divide-x divide-gray-100">
      <Sidebar path={pathname.replace("/", "")} />
      <main className="h-screen overflow-y-auto w-full">{children}</main>
    </div>
  );
};
