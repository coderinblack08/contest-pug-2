import { LinkOutline, MailOutline, UsersOutline } from "heroicons-react";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useQuery } from "react-query";
import { JoinButton } from "../../components/contest/JoinButton";
import { Tabs } from "../../components/contest/Tabs";
import { Layout } from "../../components/general/Layout";
import { Link } from "../../components/general/Link";
import { Navbar } from "../../components/general/Navbar";
import { FetchedContest } from "../../types";
import { shortenNumber } from "../../utils/shortenNumber";

interface Props {
  slug: string;
}

const ContestPage: NextPage<Props> = ({ slug }) => {
  const { data: contest, isLoading } = useQuery<FetchedContest>(
    `/contests/${slug}`
  );

  return (
    <div>
      <Navbar />
      <Layout>
        {!isLoading ? (
          <div>
            <Tabs slug={slug} />
            <header className="flex items-end justify-between w-full mt-6">
              <h1 className="text-xl font-bold">{contest?.name}</h1>
              {!contest?.isOwner && <JoinButton slug={slug} />}
            </header>
            <p className="mt-4 text-gray-300">{contest?.description}</p>
            <div className="flex items-center space-x-5 mt-5">
              {contest?.email ? (
                <div className="inline-flex items-center">
                  <MailOutline size={18} className="mr-2 text-gray-500" />
                  <Link href={`mailto:${contest?.email}`} unstyled>
                    {contest?.email}
                  </Link>
                </div>
              ) : (
                <p className="text-gray-500">No Email Provided</p>
              )}
              {contest?.website ? (
                <div className="inline-flex items-center">
                  <LinkOutline size={18} className="mr-2 text-gray-400" />
                  <Link href={contest?.website}>{contest?.website}</Link>
                </div>
              ) : (
                <p className="text-gray-500">No Website Provided</p>
              )}
              <div className="inline-flex items-center font-medium text-gray-400">
                <UsersOutline size={18} className="mr-1.5" />
                {shortenNumber(contest?.competitors!)}
              </div>
            </div>
          </div>
        ) : (
          "Loading..."
        )}
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const slug = query.slug;
  return { props: { slug } };
};

export default ContestPage;
