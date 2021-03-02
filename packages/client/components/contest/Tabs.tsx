import { Link } from "../general/Link";
import React from "react";
import { useQuery } from "react-query";
import { FetchedContest } from "../../types";
import { useRouter } from "next/router";

export const Tabs: React.FC<{ slug: string }> = ({ slug }) => {
  const { data: contest } = useQuery<FetchedContest>(`/contests/${slug}`);
  const { route } = useRouter();
  const onRoute = (r: string) => r === route.replace("/[slug]", "");

  const tabStyles = (r: string) =>
    onRoute(r)
      ? "p-3 border-b-2 border-blue-500 text-blue-500 focus:outline-none focus:text-blue-400 font-bold"
      : "p-3 text-gray-400 border-b-2 border-gray-900 focus:outline-none focus:text-gray-300";

  return (
    <nav className="flex items-center space-x-6">
      <Link
        className={tabStyles("/contest")}
        href={`/contest/${slug}`}
        unstyled
      >
        Overview
      </Link>
      {contest?.isOwner ? (
        <Link
          className={tabStyles("/problems")}
          href={`/problems/${slug}`}
          unstyled
        >
          Problems
        </Link>
      ) : null}
      {contest?.joined || contest?.isOwner ? (
        <Link
          className={tabStyles("/compete")}
          href={`/compete/${slug}`}
          unstyled
        >
          Compete
        </Link>
      ) : null}
      {contest?.joined || contest?.isOwner ? (
        <Link
          className={tabStyles("/leaderboard")}
          href={`/leaderboard/${slug}`}
          unstyled
        >
          Leaderboard
        </Link>
      ) : null}
    </nav>
  );
};
