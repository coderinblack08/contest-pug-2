import React from "react";
import { MeQuery, User } from "../generated/graphql";

export const Avatar: React.FC<{
  clickable?: boolean;
  minimize?: boolean;
  data?: Partial<User> | Partial<MeQuery["me"]>;
}> = ({ clickable = false, minimize, data }) => {
  const baseStyle = `${
    clickable
      ? "group focus:outline-none focus:ring transition duration-300 hover:bg-primary-100"
      : ""
  } ${minimize ? "w-auto" : "w-full"} p-1.5 rounded-full text-left flex items-center space-x-3`;

  const avatar = (
    <>
      <div className="w-12 h-12">
        <div className="aspect-w-1 aspect-h-1">
          <img src={data?.profilePicture} alt="Profile" className="object-cover rounded-full" />
        </div>
      </div>
      {!minimize && (
        <div>
          <h3
            className={`${
              clickable ? "group-hover:text-primary-500" : ""
            } text-gray-800 font-bold text-lg leading-none mb-0.5`}
          >
            {data?.displayName}
          </h3>
          <p
            className={`${
              clickable ? "group-hover:text-primary-400" : ""
            } text-gray-500 text-[13px]`}
          >
            @{data?.username}
          </p>
        </div>
      )}
    </>
  );

  if (clickable) {
    return <button className={baseStyle}>{avatar}</button>;
  }
  return <div className={baseStyle}>{avatar}</div>;
};
