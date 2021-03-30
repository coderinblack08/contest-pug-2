import React from "react";
import { MeQuery, User } from "../generated/graphql";

export const Avatar: React.FC<{
  clickable?: boolean;
  padding?: boolean;
  minimize?: number;
  className?: string;
  data?: Partial<User> | Partial<MeQuery["me"]>;
}> = ({ clickable = false, padding = true, minimize, data, className }) => {
  const baseStyle = `${
    clickable
      ? "group focus:outline-none focus:ring transition duration-300 hover:bg-primary-100"
      : ""
  } w-full ${
    padding ? "p-1.5" : ""
  } rounded-full text-left flex items-center space-x-3 ${className}`;

  const avatar = (
    <>
      <div className="w-12 h-auto">
        <div className="aspect-w-1 aspect-h-1">
          <img
            width={48}
            height={48}
            src={data?.profilePicture ?? "/loading.png"}
            alt="Profile"
            className="object-cover rounded-full"
          />
        </div>
      </div>
      <div className={minimize === 850 ? "hidden 850:block" : undefined}>
        <h3
          className={`${
            clickable ? "group-hover:text-primary-500" : ""
          } text-gray-800 font-bold text-lg leading-none mb-0.5`}
        >
          {data?.displayName}
        </h3>
        <p
          className={`${clickable ? "group-hover:text-primary-400" : ""} text-gray-500 text-[13px]`}
        >
          @{data?.username}
        </p>
      </div>
    </>
  );

  if (clickable) {
    return <button className={baseStyle}>{avatar}</button>;
  }
  return <div className={baseStyle}>{avatar}</div>;
};
