import { formatISO } from "date-fns";
import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { Button } from "../components/Button";
import { FormikInput } from "../components/Input";
import { Layout } from "../components/Layout";
import { useCreateContestMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Create: React.FC = () => {
  const [create] = useCreateContestMutation();

  return (
    <Layout>
      <div className="space-y-5 px-8 py-10 max-w-lg">
        <div>
          <h1 className="font-bold text-2xl leading-loose text-gray-800">Publish Contest</h1>
          <p className="text-sm text-gray-600">
            Start by entering information about your contest. You can add problems after completing
            this step.
          </p>
        </div>
        <Formik
          initialValues={{
            name: "",
            website: "",
            email: "",
            description: "",
            start: "" as string | undefined,
            end: "" as string | undefined,
          }}
          validationSchema={yup.object().shape({
            name: yup.string().trim().min(5).max(100).required(),
            website: yup.string().url(),
            email: yup.string().email(),
            description: yup.string().min(20).max(1000).required(),
            start: yup.string().nullable(),
            end: yup.string().nullable(),
          })}
          onSubmit={async (values) => {
            const newValues = { ...values };
            if (values.start) {
              newValues.start = formatISO(new Date(values.start));
            } else {
              newValues.start = undefined;
            }
            if (values.end) {
              newValues.end = formatISO(new Date(values.end));
            } else {
              newValues.end = undefined;
            }
            const result = await create({
              variables: { args: newValues },
              update: (cache) => {
                cache.evict({ fieldName: "findContests" });
              },
            });
            console.log(result);
          }}
        >
          {() => (
            <Form className="space-y-4">
              <FormikInput name="name" label="Name" themeSize="full" />
              <div className="grid grid-cols-2 gap-2">
                <FormikInput name="email" label="E-mail" themeSize="full" />
                <FormikInput name="website" label="Website" themeSize="full" />
              </div>
              <FormikInput name="description" label="Description" themeSize="full" textarea />
              <div className="grid grid-cols-2 gap-2">
                {/* TODO: replace with custom datepicker (datetime-local not supported on firefox) */}
                <FormikInput
                  name="start"
                  type="datetime-local"
                  label="Start Time"
                  themeSize="full"
                />
                <FormikInput name="end" type="datetime-local" label="End Time" themeSize="full" />
              </div>
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Create);
