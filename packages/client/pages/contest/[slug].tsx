import { MailOutline } from "heroicons-react";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { useQuery } from "react-query";
import { JoinModal } from "../../components/contest/JoinModal";
import { Layout } from "../../components/general/Layout";
import { Link } from "../../components/general/Link";
import { Navbar } from "../../components/general/Navbar";
import { FetchedContest } from "../../types";

interface Props {
  slug: string;
}

const ContestPage: NextPage<Props> = ({ slug }) => {
  const { data: contest } = useQuery<FetchedContest>(`/contests/${slug}`);

  return (
    <div>
      <Navbar />
      <Layout>
        <header className="flex items-end justify-between w-full">
          <h1 className="text-xl font-bold">{contest?.name}</h1>
          <JoinModal slug={slug} />
        </header>
        <pre>{JSON.stringify(contest, null, 2)}</pre>
        <p className="mt-4 text-gray-300">{contest?.description}</p>
        <div className="flex items-center space-x-5 mt-5">
          {contest?.email ? (
            <Link href={`mailto:${contest?.email}`}>{contest?.email}</Link>
          ) : (
            <p className="text-gray-500">No Email Provided</p>
          )}
          {contest?.website ? (
            <div className="inline-flex items-center">
              <MailOutline size={18} className="mr-2 text-gray-500" />
              <Link href={contest?.website}>{contest?.website}</Link>
            </div>
          ) : (
            <p className="text-gray-500">No Website Provided</p>
          )}
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const slug = query.slug;
  return { props: { slug } };
};

export default ContestPage;
