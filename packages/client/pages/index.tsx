import { UsersOutline } from "heroicons-react";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { Layout } from "../components/general/Layout";
import { Navbar } from "../components/general/Navbar";
import { Contest, User } from "../types";
import { shortenNumber } from "../utils/shortenNumber";

const Dashboard: React.FC = () => {
  const { data } = useQuery<Contest[]>("/contests");
  const { data: me } = useQuery<User | null>("/me");

  return (
    <div>
      <Navbar />
      <Layout>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data?.map((contest) => (
            <Link href="/" key={contest.id}>
              <button className="select-text text-left focus:outline-none px-5 py-4 rounded-md bg-gray-800 border border-gray-700 shadow-md focus:ring">
                {me?.id === contest.creatorId ? (
                  <p className="text-sm text-blue-400">Owner</p>
                ) : null}
                <h2 className="text-lg font-bold">{contest.name}</h2>
                <p className="text-gray-400 line-clamp-3 mt-2">
                  {contest.description}
                </p>
                <div className="flex justify-between mt-3 text-gray-300 text-sm">
                  <div className="inline-flex items-center font-medium">
                    <UsersOutline size={14} className="mr-1.5" />
                    {shortenNumber(contest.competitors)}
                  </div>
                </div>
              </button>
            </Link>
          ))}
          <Link href="/new">
            <button className="select-text flex items-center justify-center focus:outline-none px-5 py-4 rounded-md bg-blue-600 border border-blue-400 h-32 shadow-md focus:ring">
              <p className="font-bold">👋 &nbsp; Create Contest</p>
            </button>
          </Link>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
