import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Contest, FetchedContest } from "../../types";
import { mutator } from "../../utils/mutator";
import { Button } from "../form/Button";
import { Input } from "../form/Input";
import { Modal } from "../general/Modal";

export const JoinModal: React.FC<{ slug: string }> = ({ slug }) => {
  const [open, setOpen] = useState(false);
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
          if (contest?.joined) {
            toggleJoin();
          } else {
            setOpen(true);
          }
        }}
      >
        ️{contest?.joined ? "Unjoin 👋" : "Join 👈"}
      </Button>
      <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
        <h2 className="font-bold text-lg mb-1">Registration Form</h2>
        <p className="text-gray-400">
          {contest?.instructions || "No Instructions Provided"}
        </p>
        <Formik
          initialValues={() => {
            return contest?.form.reduce((acc, x) => {
              return (acc[x.question] = "");
            }, {});
          }}
          onSubmit={(values) => {
            toggleJoin(values);
            setOpen(false);
          }}
        >
          {() => (
            <Form className="mt-4">
              {contest?.form.map(({ question, type, required }) => (
                <Input
                  type={type}
                  name={question}
                  label={question}
                  className="mb-3"
                  required={required}
                />
              ))}
              <Button
                type="button"
                className="mr-3 mt-4"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button color="blue" type="submit" className="mt-4">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};
