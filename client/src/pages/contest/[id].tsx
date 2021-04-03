import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Calendar, ChevronUp, People, Unlock, ChevronDown, Setting } from "react-iconly";
import { Avatar } from "../../components/Avatar";
import { Layout } from "../../components/Layout";
import { ProblemsEditor } from "../../components/Problems/ProblemsEditor";
import { Spinner } from "../../components/Spinner";
import { useGetContestQuery } from "../../generated/graphql";
import { useFormatDate } from "../../utils/formatDate";
import { withApollo } from "../../utils/withApollo";

const ContestLink: React.FC<{
  href?: string;
  filled?: boolean;
  text: string | null;
  icon: React.ReactNode;
}> = ({ text, icon, href, filled = false }) => {
  return React.createElement(
    href ? "a" : "div",
    {
      className: `flex items-center ${
        filled
          ? "bg-gradient-to-b from-primary-400 to-primary-600 text-white"
          : `bg-white ${href ? "text-primary-400" : "text-gray-700"}`
      } rounded-2xl p-2 w-full lg:w-64`,
      href,
    },
    <>
      <div
        className={`p-2 rounded-2xl ${
          filled ? "text-primary-500 bg-primary-100" : "border shadow-sm"
        }`}
      >
        {icon}
      </div>
      <p className="truncate font-medium ml-3">{text}</p>
    </>
  );
};

const ContestInfoBar: React.FC = () => {
  const {
    query: { id },
  } = useRouter();
  const { data, loading } = useGetContestQuery({ variables: { id: id as string } });
  const [status] = useFormatDate(data?.getContest.start as string, data?.getContest.end as string);
  const [open, setOpen] = useState(true);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      className={`${
        open ? "px-5 pt-2 pb-5 md:px-12 md:py-6" : "px-8 py-5 md:px-12 md:py-6"
      } rounded-b-3xl shadow-sm w-full`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div
          className={`flex items-start ${open ? "flex-col space-y-5 md:mr-4" : "flex-row w-full"}`}
        >
          <Avatar
            className="hidden md:flex w-auto min-w-max"
            data={data?.getContest.creator}
            padding={false}
          />
          <Avatar
            className="block md:hidden w-auto min-w-max"
            data={data?.getContest.creator}
            padding={false}
            minimize={850}
          />
          <div className={`min-w-0 ${!open ? "ml-5 md:ml-10" : ""}`}>
            <h1 className={`${open ? "text-2xl md:text-3xl" : "text-2xl leading-none"} font-bold`}>
              {data?.getContest.name}
            </h1>
            <p
              className={`${
                open ? "text-sm md:text-base mt-3" : "text-sm truncate mt-1.5 max-w-lg"
              } text-gray-500`}
            >
              {data?.getContest.description}
            </p>
          </div>
          {!open && (
            <button
              onClick={() => setOpen(true)}
              className="ml-auto my-auto text-gray-400 p-2 rounded-full shadow  focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <ChevronDown size={20} />
            </button>
          )}
        </div>
        {open && (
          <div className="flex flex-col mt-6 md:mt-0 w-full md:w-auto space-y-2">
            <ContestLink icon={<Calendar size={20} set="curved" />} text={status} filled />
            <ContestLink
              icon={<People size={20} set="curved" />}
              text={`${data?.getContest.competitors} Participants`}
            />
            {data?.getContest.website && (
              <ContestLink
                icon={<Unlock size={20} set="curved" />}
                text={data.getContest.website}
                href={data.getContest.website}
              />
            )}
          </div>
        )}
      </div>
      {open && (
        <div className="flex justify-center mt-5 text-gray-400">
          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <ChevronUp size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

const Contest: React.FC = () => {
  const {
    query: { id },
  } = useRouter();
  const { data } = useGetContestQuery({ variables: { id: id as string } });

  return (
    <Layout>
      <main>
        {data?.getContest.isCreator && (
          <nav className="flex items-center justify-center md:justify-start shadow-sm py-3 px-5 font-medium text-[15px] space-x-6">
            <Link href="/contest/[id]" as={`/contest/${id}`}>
              <a className="bg-white px-3 py-1 text-primary-500 rounded-xl shadow focus:outline-none focus:shadow-inner font-semibold">
                Editor
              </a>
            </Link>
            <a className="text-gray-600">Grading</a>
            <a className="text-gray-600">Forum</a>
          </nav>
        )}
        <ContestInfoBar />
        <ProblemsEditor id={id as string} />
      </main>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Contest);
