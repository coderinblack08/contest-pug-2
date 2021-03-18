import React from "react";
import { useMeQuery } from "../generated/graphql";

export const Avatar: React.FC = () => {
  const { data } = useMeQuery();

  return (
    <button className="group w-full p-1.5 rounded-full text-left focus:outline-none focus:ring transition duration-300 hover:bg-primary-100 flex items-center space-x-3">
      <img src={data?.me?.profilePicture} alt="Profile" className="rounded-full w-12 h-12" />
      <div>
        <h3 className="group-hover:text-primary-500 text-gray-800 font-bold text-lg leading-none mb-0.5">
          {data?.me?.displayName}
        </h3>
        <p className="group-hover:text-primary-400 text-gray-500 text-[13px]">
          @{data?.me?.username}
        </p>
      </div>
    </button>
  );
};
