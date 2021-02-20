import { Form, Formik } from "formik";
import React, { useReducer, useState } from "react";
import { Button } from "../components/form/Button";
import { Input } from "../components/form/Input";
import { Layout } from "../components/general/Layout";
import { Navbar } from "../components/general/Navbar";
import * as yup from "yup";
import { PencilOutline, TrashOutline } from "heroicons-react";

const New: React.FC = () => {
  const [tab, setTab] = useState(1);
  const [values, setValues] = useState({
    name: "",
    website: "",
    email: "",
    description: "",
  });

  const schema = yup.object({
    name: yup.string().min(2).max(25).required(),
    website: yup.string().url().max(255),
    email: yup.string().email().max(255),
    description: yup.string().min(20).max(10000).required(),
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
                  onSubmit={(v) => {
                    setValues(v);
                    setTab(tab + 1);
                  }}
                  initialValues={values}
                  validationSchema={schema}
                >
                  {({}) => (
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
                  }}
                  initialValues={values}
                  validationSchema={schema}
                >
                  {({}) => (
                    <Form className="max-w-lg 2xl:max-w-xl">
                      <h1 className="text-xl font-bold mb-1">
                        Contest Registration
                      </h1>
                      <p className="mb-5 text-gray-400">
                        Competitors will have to answer this forum to compete.
                      </p>
                      <div className="space-y-5">
                        <div className=" bg-gray-800 border border-gray-700 rounded px-4 py-3">
                          <div className="flex justify-between items-center">
                            <input
                              type="text"
                              value="Birthday"
                              className="bg-gray-800"
                              disabled
                            />
                            <div className="flex items-center space-x-2">
                              <button>
                                <PencilOutline size={20} />
                              </button>
                              <button className="text-red-500">
                                <TrashOutline size={20} />
                              </button>
                            </div>
                          </div>
                          <div className="mt-3">
                            <label
                              htmlFor="type"
                              className="text-gray-400 text-sm font-bold mb-1.5 inline-block"
                            >
                              Type
                            </label>
                            <select
                              name="type"
                              className="form-select block bg-gray-700 border border-gray-600 w-44 rounded"
                            >
                              <option value="string" defaultChecked>
                                word
                              </option>
                              <option value="datetime">datetime</option>
                              <option value="number">number</option>
                            </select>
                            <label
                              htmlFor="required"
                              className="inline-flex items-center mt-3"
                            >
                              <input
                                type="checkbox"
                                name="required"
                                id="required"
                                className="form-checkbox text-blue-500 rounded"
                              />
                              <span className="ml-2">Required</span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-36 mt-10">
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
