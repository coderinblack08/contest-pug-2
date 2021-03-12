import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Contest, FetchedContest } from "../../types";
import { mutator } from "../../utils/mutator";
import { Button } from "../form/Button";

export const JoinButton: React.FC<{ slug: string }> = ({ slug }) => {
  const { data: contest } = useQuery<FetchedContest>(`/contests/${slug}`);
  const cache = useQueryClient();
  const { mutate } = useMutation(mutator);

  const toggleJoin = (values: any = null) => {
    mutate(
      [
        `/contests/${contest?.joined ? "unjoin" : "join"}`,
        { contestId: slug, response: contest?.joined ? null : values },
        "POST",
      ],
      {
        onSuccess: (x: boolean) => {
          if (x) {
            cache.setQueryData(`/contests/${slug}`, (old: FetchedContest) => ({
              ...old,
              joined: !old.joined,
              competitors: old.competitors + (old.joined ? -1 : 1),
            }));
            if (cache.getQueryData("/contests/joined")) {
              cache.setQueryData("/contests/joined", (old: Contest[]) => {
                const index = old.findIndex((x) => x.id === contest?.id);
                old[index] = {
                  ...old[index],
                  competitors:
                    old[index].competitors + (contest?.joined ? -1 : 1),
                };
                return old;
              });
            } else {
              cache.fetchQuery("/contests/joined");
            }
          }
        },
      }
    );
  };

  return (
    <div>
      <Button
        className="px-5"
        color="blue"
        onClick={() => {
          toggleJoin();
        }}
      >
        ️{contest?.joined ? "Unjoin 👋" : "Join 👈"}
      </Button>
    </div>
  );
};
