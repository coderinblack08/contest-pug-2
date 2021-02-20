import { UsersOutline } from "heroicons-react";
import Link from "next/link";
import React from "react";
import { Layout } from "../components/general/Layout";
import { Navbar } from "../components/general/Navbar";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Layout>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/">
            <button className="select-text text-left focus:outline-none px-5 py-4 rounded-md bg-gray-800 border border-gray-700 shadow-md focus:ring">
              <p className="text-sm text-blue-400">Owner</p>
              <h2 className="text-lg font-bold">Trivia Pug</h2>
              <p className="text-gray-400 line-clamp-3 mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur nemo amet, saepe consectetur voluptates debitis rem
                minima, atque quas porro autem possimus. Praesentium cupiditate
                voluptate voluptas asperiores nemo reiciendis tempora.
              </p>
              <div className="flex justify-between mt-3 text-gray-300 text-sm">
                <div className="inline-flex items-center font-medium">
                  <UsersOutline size={14} className="mr-1.5" />
                  1.2k
                </div>
              </div>
            </button>
          </Link>
          <Link href="/new">
            <button className="flex items-center justify-center focus:outline-none px-5 py-4 rounded-md bg-blue-600 border border-blue-400 h-32 shadow-md focus:ring">
              <div className="inline-flex items-center">
                {/* <Plus size={20} className="mr-1.5" /> */}
                <p className="font-bold">👋 &nbsp; Create Contest</p>
              </div>
            </button>
          </Link>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
