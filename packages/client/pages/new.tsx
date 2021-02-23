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
              instruction: "",
              form: [],
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
                <Input name="name" label="Name" placeholder="Example" />
                <Input
                  name="website"
                  label="Website"
                  placeholder="https://example.com"
                />
                <Input
                  name="email"
                  label="Email"
                  placeholder="contact@example.com"
                />
                <Input
                  name="description"
                  label="Description"
                  placeholder="Example..."
                  textarea
                />
              </div>
              <h1 className="text-xl font-bold mb-1 mt-12">
                Contest Registration
              </h1>
              <p className="mb-5 text-gray-400">
                Competitors will have to answer this forum to compete. This
                entire page is{" "}
                <strong className="text-gray-300">optional</strong> for you to
                fill out.
              </p>
              <Input
                name="instructions"
                label="Instructions"
                placeholder="Example..."
                className="mb-8"
                textarea
              />
              <FieldArray name="form">
                {({ push, remove }) => (
                  <>
                    {data.form.map((_, index) => (
                      <div
                        className="relative bg-gray-800 border border-gray-700 rounded px-4 py-3 mb-5"
                        key={index}
                      >
                        <Input
                          name={`form[${index}].question`}
                          placeholder="Question Label"
                          minimal
                        />
                        <button
                          type="button"
                          className="absolute top-0 m-4 right-0 text-red-500"
                          onClick={() => remove(index)}
                        >
                          <TrashOutline size={20} />
                        </button>
                        <label className="inline-block mt-3">
                          <p className="text-gray-300 text-sm font-bold mb-1.5">
                            Type
                          </p>
                          <Field
                            name={`form[${index}].type`}
                            className="form-select block bg-gray-700 border border-gray-600 w-44 rounded"
                            as="select"
                          >
                            <option value="text" defaultChecked>
                              Text
                            </option>
                            <option value="number">Number</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="tel">Telephone</option>
                            <option value="datetime">Datetime</option>
                            <option value="date">Date</option>
                            <option value="time">Time</option>
                          </Field>
                        </label>
                        <br />
                        <label className="inline-flex items-center mt-3">
                          <Field
                            type="checkbox"
                            className="form-checkbox text-blue-600 focus:ring rounded bg-gray-600"
                            name={`form[${index}].required`}
                          />
                          <span className="ml-2">Required</span>
                        </label>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        push({
                          question: "",
                          type: "text",
                          required: false,
                        });
                      }}
                      disabled={isLoading}
                      className="flex items-center justify-center focus:outline-none px-5 py-3 rounded-md bg-blue-600 border border-blue-400 shadow-md focus:ring w-full"
                    >
                      <div className="inline-flex items-center">
                        <p className="font-bold">🙌 &nbsp; New Question</p>
                      </div>
                    </button>
                  </>
                )}
              </FieldArray>
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
