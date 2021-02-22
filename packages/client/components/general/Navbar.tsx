import { LogoutOutline, PlusOutline } from "heroicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useTokenStore } from "../../store/auth";
import { User } from "../../types";
import { ImageWithSpinner } from "./ImageWithSpinner";

const routes = {
  "/": "Home",
  "/compete": "Compete",
  "/archive": "Archive",
};

export const Navbar: React.FC = ({}) => {
  const { route } = useRouter();
  const { data: me } = useQuery<User | null>("/me");
  const onRoute = (r: string) =>
    r === route.replace("http://localhost:3000", "");

  return (
    <div className="sticky top-0 bg-gray-800 py-4 shadow-2xl">
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
        <ul className="flex items-center space-x-3">
          <li>
            <Link href="/new">
              <button className="inline-flex items-center justify-center w-9 h-9 focus:bg-gray-600 focus:ring focus:ring-gray-500 bg-gray-700 rounded focus:outline-none">
                <PlusOutline size={26} />
              </button>
            </Link>
          </li>
          <li>
            <button
              className="inline-flex items-center justify-center w-9 h-9 focus:bg-red-500 focus:ring focus:ring-red-400 bg-gray-700 rounded focus:outline-none"
              onClick={() => {
                useTokenStore
                  .getState()
                  .setTokens({ accessToken: "", refreshToken: "" });
                useQueryClient().setQueryData<User | null>("/me", null);
              }}
            >
              <LogoutOutline size={20} />
            </button>
          </li>
          <li>
            <Link href="/profile">
              <a>
                <ImageWithSpinner
                  className="rounded-full w-8 h-8 ring ring-blue-500"
                  src={me?.profilePicture!}
                  alt="Profile picture"
                />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
