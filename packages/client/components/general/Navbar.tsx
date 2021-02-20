import React from "react";
import Link from "next/link";
import { PlusOutline, UserOutline } from "heroicons-react";
import { useRouter } from "next/router";

const routes = {
  "/": "Home",
  "/compete": "Compete",
  "/archive": "Archive",
};

export const Navbar: React.FC = ({}) => {
  const { route } = useRouter();
  const onRoute = (r: string) =>
    r === route.replace("http://localhost:3000", "");

  return (
    <div className="sticky top-0 bg-gray-800 py-4">
      <nav className="flex items-center justify-between md:max-w-3xl max-w-2xl mx-auto px-5">
        <ul className="flex items-center space-x-10 text-gray-400">
          {Object.keys(routes).map((r) => (
            <li
              key={Math.random()}
              className={onRoute(r) ? "text-white font-medium" : undefined}
            >
              <Link href={`${r}`}>{routes[r]}</Link>
            </li>
          ))}
        </ul>
        <ul className="flex items-center space-x-2">
          {/* TODO: Refactor this mess */}
          <li>
            <Link href="/new">
              <button className="inline-flex items-center justify-center w-9 h-9 focus:bg-gray-600  bg-gray-700 rounded focus:outline-none">
                <PlusOutline size={26} />
              </button>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a className="inline-flex items-center justify-center w-9 h-9 focus:bg-gray-600  hover:bg-gray-700 rounded focus:outline-none">
                <UserOutline size={20} />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
