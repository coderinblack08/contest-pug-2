import { PlusOutline } from "heroicons-react";
import Link from "next/link";
import React from "react";
import { Notification } from "react-iconly";
import { Button } from "./Button";
import { Input } from "./Input";
import { LoginModal } from "./LoginModal";

export const Navbar: React.FC<{ landingPage?: boolean }> = ({ landingPage = false }) => {
  if (!landingPage) {
    return (
      <div className="flex 900:flex-row 900:items-center 900:justify-between flex-col 900:space-y-0 space-y-4 py-2 bg-white w-full">
        <Input
          name="search"
          placeholder="Search for contests or communities"
          className="w-full 900:w-96"
          themeSize="none"
          search
        />
        <div className="flex items-center space-x-2 900:ml-2">
          <Button
            icon={<PlusOutline />}
            rounded
            size="sm"
            href="/create"
            aria-label="Create Contest"
          />
          <Button
            icon={<Notification set="curved" stroke="bold" className="text-slate-dark" />}
            rounded
            color="default"
            size="sm"
            aria-label="Notifications"
          />
          <Button color="default"> Filter</Button>
        </div>
      </div>
    );
  }

  return (
    <nav className="flex items-center justify-between w-full py-8 px-5">
      <Link href="/">
        <a>
          <img src="/logo.svg" alt="Logo" />
        </a>
      </Link>
      <div className="hidden md:flex items-center space-x-10 text-slate-dark text-sm">
        <Link href="/">
          <a className="text-primary-500 font-display">Home</a>
        </Link>
        <Link href="/about">
          <a className="font-display">About</a>
        </Link>
        <Link href="/integrations">
          <a className="font-display">Integrations</a>
        </Link>
        <a href="https://github.com/coderinblack08/contest-pug-2" className="font-display">
          Contribute
        </a>
      </div>
      <LoginModal />
    </nav>
  );
};
