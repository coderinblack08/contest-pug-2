import { GetServerSideProps, NextPage } from "next";
import { Link } from "../../components/general/Link";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button } from "../../components/form/Button";
import { Layout } from "../../components/general/Layout";
import { Navbar } from "../../components/general/Navbar";
import { Contest } from "../../types";
import { MailOutline } from "heroicons-react";
import { mutator } from "../../utils/mutator";

interface Props {
  slug: string;
}

type FetchedContest = Contest & { isCreator: boolean; joined: boolean };

const ContestPage: NextPage<Props> = ({ slug }) => {
  const { data: contest } = useQuery<FetchedContest>(`/contests/${slug}`);
  const cache = useQueryClient();
  const { mutate } = useMutation(mutator);

  return (
    <div>
      <Navbar />
      <Layout>
        <header className="flex items-end justify-between w-full">
          <h1 className="text-xl font-bold">{contest?.name}</h1>
          <Button
            className="px-5"
            color="blue"
            onClick={() => {
              mutate(
                [
                  `/contests/${contest?.joined ? "unjoin" : "join"}`,
                  { contestId: slug },
                  "POST",
                ],
                {
                  onSuccess: (x) => {
                    cache.setQueryData(
                      `/contests/${slug}`,
                      (old: FetchedContest) => ({
                        ...old,
                        joined: !old.joined,
                        competitors: old.competitors + (old.joined ? -1 : 1),
                      })
                    );
                    if (cache.getQueryData("/contests/joined")) {
                      cache.setQueryData(
                        "/contests/joined",
                        (old: Contest[]) => {
                          const index = old.findIndex(
                            (x) => x.id === contest?.id
                          );
                          old[index] = {
                            ...old[index],
                            competitors:
                              old[index].competitors +
                              (contest?.joined ? -1 : 1),
                          };
                          return old;
                        }
                      );
                    } else {
                      cache.fetchQuery("/contests/joined");
                    }
                  },
                }
              );
            }}
          >
            ️{contest?.joined ? "Unjoin 👋" : "Join 👈"}
          </Button>
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
