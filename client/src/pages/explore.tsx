import React from "react";
import { Button } from "../components/Button";
import { ContestCard } from "../components/ContestCard";
import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { useFindContestsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Explore: React.FC = () => {
  const { data, loading, fetchMore } = useFindContestsQuery({
    variables: { args: { limit: 5 } },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Layout>
      <div className="px-8 py-10">
        <Navbar />
        <div className="space-y-2 max-w-2xl mt-3">
          {data?.findContests.contests.map((contest) => (
            <ContestCard key={contest.id} data={contest} />
          ))}
        </div>
        {data?.findContests.hasMore && (
          <div className="flex justify-center">
            <Button
              color="default"
              onClick={() =>
                fetchMore({
                  variables: {
                    args: {
                      limit: 5,
                      cursor:
                        data.findContests.contests[data.findContests.contests.length - 1].createdAt,
                    },
                  },
                })
              }
              loading={loading}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Explore);
