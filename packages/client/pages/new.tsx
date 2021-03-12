import { contestSchema } from "@contest-pug/common";
import { Field, FieldArray, Form, Formik } from "formik";
import { TrashOutline } from "heroicons-react";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "../components/form/Button";
import { Input } from "../components/form/Input";
import { Layout } from "../components/general/Layout";
import { Navbar } from "../components/general/Navbar";
import { Contest, FormikContest } from "../types";
import { mutator } from "../utils/mutator";

const New: React.FC = () => {
  const { mutate, isLoading } = useMutation(mutator);
  const cache = useQueryClient();
  const router = useRouter();

  return (
    <div>
      <Navbar />
      <Layout>
        <Formik
          onSubmit={(values) => {
            mutate(["/contests/create", values, "POST"], {
              onSuccess: async (x) => {
                router.push("/");
                if (!cache.getQueryData("/contests/joined")) {
                  await cache.fetchQuery("/contests/joined");
                } else {
                  cache.setQueryData("/contests/joined", (old: Contest[]) => [
                    ...old,
                    x,
                  ]);
                }
              },
              onError: (err) => console.error(err),
            });
          }}
          initialValues={
            {
              name: "",
              website: "",
              email: "",
              description: "",
            } as FormikContest
          }
          validationSchema={contestSchema}
        >
          {({ values: data }) => (
            <Form className="max-w-lg 2xl:max-w-xl">
              {/* <pre>{JSON.stringify(contestSchema.validate(data), null, 2)}</pre> */}
              <h1 className="text-xl font-bold mb-1">Basic Information</h1>
              <p className="mb-5 text-gray-400">
                Answer questions about your contest such as its name, website,
                etc.
              </p>
              <div className="space-y-5">
                <Input
                  name="name"
                  label="Name"
                  placeholder="Example"
                  className="w-full"
                />
                <Input
                  name="website"
                  label="Website"
                  placeholder="https://example.com"
                  className="w-full"
                />
                <Input
                  name="email"
                  label="Email"
                  placeholder="contact@example.com"
                  className="w-full"
                />
                <Input
                  name="description"
                  label="Description"
                  placeholder="Example..."
                  className="w-full"
                  textarea
                />
              </div>
              <Button type="submit" className="w-32 mt-5">
                Finish
              </Button>
            </Form>
          )}
        </Formik>
      </Layout>
    </div>
  );
};

export default New;
