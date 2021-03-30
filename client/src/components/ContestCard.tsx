import { format, formatDistanceToNow, isPast } from "date-fns";
import { Calendar, People } from "react-iconly";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Contest } from "../generated/graphql";
import { Avatar } from "./Avatar";
import { Tooltip } from "./Tooltip";
import { useFormatDate } from "../utils/formatDate";

interface ContestCardProps {
  type?: "active" | "default";
  data: Partial<Contest>;
}

export const ContestCard: React.FC<ContestCardProps> = ({ data, type = "default" }) => {
  const [status, formatStart, formatEnd] = useFormatDate(data.start as string, data.end as string);

  return (
    <Link href="/contest/[id]" as={`/contest/${data.id}`}>
      <a
        className={`group max-w-2xl block transition hover:bg-[#F8FAFF] space-y-5 rounded-2xl p-5 ${
          type === "active" ? "bg-[#F8FAFF]" : ""
        }`}
      >
        <Avatar
          data={{
            profilePicture:
              "https://lh3.googleusercontent.com/a-/AOh14GgvhsoW1H6FenDHDQYks1rt2OonjD4T44C7evWFJw=s96-c",
            username: "coderinblack",
            displayName: "Kevin Lu",
          }}
        />
        <div>
          <h2
            className={`text-2xl group-hover:text-primary-500 ${
              type === "active" ? "text-primary-500" : "text-gray-800"
            } font-bold`}
          >
            {data.name}
          </h2>
          <p className="text-gray-500 truncate">{data.description}</p>
        </div>
        <div className="flex items-center space-x-5 text-slate-dark">
          <Tooltip tip={`contest-${data.id}`} tooltip={`${formatStart} - ${formatEnd}`}>
            <div className="flex items-center">
              <Calendar size={18} className="mr-2" />
              <p>{status}</p>
            </div>
          </Tooltip>
          <div className="flex items-center">
            <People size={20} className="mr-2" />
            <p>{data.competitors} participants</p>
          </div>
        </div>
      </a>
    </Link>
  );
};
