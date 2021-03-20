import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { Button } from "../components/Button";
import { FormikInput } from "../components/Input";
import { Layout } from "../components/Layout";
import { withApollo } from "../utils/withApollo";

const Create: React.FC = () => {
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
          initialValues={{ name: "", website: "", email: "" }}
          validationSchema={yup.object().shape({
            name: yup.string().min(5).required(),
            website: yup.string().url(),
            email: yup.string().email(),
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {() => (
            <Form className="space-y-4">
              <FormikInput name="name" label="Name" themeSize="full" />
              <div className="grid grid-cols-2 gap-2">
                <FormikInput name="email" label="E-mail" themeSize="full" />
                <FormikInput name="website" label="Website" themeSize="full" />
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
