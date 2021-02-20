import { Field, FieldArray, Form, Formik } from "formik";
import { TrashOutline } from "heroicons-react";
import React, { RefObject, useState } from "react";
import * as yup from "yup";
import { Button } from "../components/form/Button";
import { Input } from "../components/form/Input";
import { Layout } from "../components/general/Layout";
import { Navbar } from "../components/general/Navbar";

interface ValueState {
  name: string;
  website?: string;
  email?: string;
  description: string;
  instruction?: string;
  form: {
    question: string;
    type: "word" | "number" | "datetime";
    required: boolean;
  }[];
}

const New: React.FC = () => {
  const [tab, setTab] = useState(1);
  const [values, setValues] = useState<ValueState>({
    name: "",
    website: "",
    email: "",
    description: "",
    instruction: "",
    form: [],
  });

  const schema = yup.object({
    name: yup.string().min(2).max(25).required(),
    website: yup.string().url().max(255),
    email: yup.string().email().max(255),
    description: yup.string().min(20).max(10000).required(),
    instruction: yup.string().max(255),
    form: yup.array().of(
      yup.object().shape({
        question: yup
          .string()
          .max(25, "Label must be at most 25 characters")
          .required("Label is a required field"),
        type: yup.string().oneOf(["word", "number", "datetime"]).required(),
        required: yup.bool().required(),
      })
    ),
  });

  return (
    <div>
      <Navbar />
      <Layout>
        {(() => {
          switch (tab) {
            case 1:
              return (
                <Formik
                  onSubmit={async (v) => {
                    setValues(v);
                    setTab(tab + 1);
                  }}
                  initialValues={values}
                  validationSchema={schema}
                >
                  {({ values: data }) => (
                    <Form className="max-w-lg 2xl:max-w-xl">
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
                      <Button type="submit" className="w-36 mt-10">
                        Next Page
                      </Button>
                    </Form>
                  )}
                </Formik>
              );

            case 2:
              return (
                <Formik
                  onSubmit={(v) => {
                    setValues(v);
                    console.log(v);
                  }}
                  initialValues={values}
                  validationSchema={schema}
                >
                  {({ values: data }) => (
                    <Form className="max-w-lg 2xl:max-w-xl">
                      <h1 className="text-xl font-bold mb-1">
                        Contest Registration
                      </h1>
                      <p className="mb-5 text-gray-400">
                        Competitors will have to answer this forum to compete.
                        This entire page is{" "}
                        <strong className="text-gray-300">optional</strong> for
                        you to fill out.
                      </p>
                      <Input
                        name="instructions"
                        label="Instructions"
                        placeholder="Example..."
                        className="mb-8"
                        textarea
                      />
                      <FieldArray name="form">
                        {({ insert, remove }) => (
                          <>
                            {data.form.map((_, index) => (
                              <div
                                className="relative bg-gray-800 border border-gray-700 rounded px-4 py-3 mb-5"
                                key={Math.random()}
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
                                    <option value="string" defaultChecked>
                                      word
                                    </option>
                                    <option value="datetime">datetime</option>
                                    <option value="number">number</option>
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
                                insert(data.form.length, {
                                  question: "",
                                  type: "word",
                                  required: false,
                                });
                              }}
                              className="flex items-center justify-center focus:outline-none px-5 py-3 rounded-md bg-blue-600 border border-blue-400 shadow-md focus:ring w-full"
                            >
                              <div className="inline-flex items-center">
                                <p className="font-bold">
                                  🙌 &nbsp; New Question
                                </p>
                              </div>
                            </button>
                          </>
                        )}
                      </FieldArray>
                      <Button
                        type="button"
                        onClick={() => setTab(tab - 1)}
                        className="w-32 mt-10 mr-3"
                      >
                        Previous
                      </Button>
                      <Button type="submit" className="w-32 mt-3">
                        Finish
                      </Button>
                    </Form>
                  )}
                </Formik>
              );

            default:
              return;
          }
        })()}
      </Layout>
    </div>
  );
};

export default New;
