import { LogoutOutline, PlusOutline } from "heroicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useTokenStore } from "../../store/auth";
import { User } from "../../types";
import { ImageWithSpinner } from "./ImageWithSpinner";
import ReactTooltip from "react-tooltip";

const routes = {
  "/": "Home",
  "/browse": "Browse",
  "/archive": "Archive",
};

export const Navbar: React.FC = ({}) => {
  const { route } = useRouter();
  const { data: me } = useQuery<User>("/me");
  const queryClient = useQueryClient();
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
        <ul className="flex items-center space-x-3">
          <li>
            <Link href="/new">
              <button
                className="inline-flex items-center justify-center w-9 h-9 focus:bg-gray-600 focus:ring focus:ring-gray-500 bg-gray-700 rounded focus:outline-none"
                data-for="new"
                data-tip
              >
                <PlusOutline size={26} />
              </button>
            </Link>
            <ReactTooltip
              id="new"
              place="bottom"
              type="dark"
              effect="solid"
              aria-haspopup
            >
              New Contest
            </ReactTooltip>
          </li>
          <li>
            <button
              className="inline-flex items-center justify-center w-9 h-9 focus:bg-red-500 focus:ring focus:ring-red-400 bg-gray-700 rounded focus:outline-none"
              onClick={() => {
                useTokenStore
                  .getState()
                  .setTokens({ accessToken: "", refreshToken: "" });
                queryClient.setQueryData<User | null>("/me", null);
              }}
              data-for="logout"
              data-tip
            >
              <LogoutOutline size={20} />
            </button>
            <ReactTooltip
              id="logout"
              place="bottom"
              type="dark"
              effect="solid"
              aria-haspopup
            >
              Logout
            </ReactTooltip>
          </li>
          <li>
            <Link href="/profile">
              <a>
                <ImageWithSpinner
                  className="rounded-full w-8 h-8 ring ring-blue-500"
                  src={me?.profilePicture!}
                  alt="Profile picture"
                  referrerPolicy="no-referrer"
                />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
