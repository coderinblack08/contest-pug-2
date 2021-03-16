import Link from "next/link";
import React from "react";
import { LoginModal } from "./LoginModal";

export const Navbar: React.FC = () => {
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
