import React, { useState } from "react";
import * as yup from "yup";
import { Problem, useCreateProblemMutation, useFindProblemsQuery } from "../../generated/graphql";
import dynamic from "next/dynamic";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { Formik, Form } from "formik";
import { FormikInput } from "../Input";
import { NativeSelect } from "../NativeSelect";
import { afterRank } from "../../utils/LexoRank/after";
import "react-quill/dist/quill.snow.css";
import { AutoSave } from "../AutoSave";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ font: [] }],
    [{ size: [] }],
    ["link", "image", "video"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export const ProblemsEditorModal: React.FC<{
  id: string;
  defaultData?: Partial<Problem>;
  opener: (fn: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode;
}> = ({ id, defaultData = {}, opener }) => {
  const [createProblem] = useCreateProblemMutation();
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useFindProblemsQuery({ variables: { contestId: id } });
  const isEdit = Object.keys(defaultData).length !== 0;

  return (
    <>
      {opener(setIsOpen)}
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        {/* <h2 className={`font-black text-2xl`}>Create Problem</h2>
        <p className={`text-gray-600 text-sm mt-2`}>
          Fill the following fields to create a new problem
        </p> */}
        <Formik<{
          question: string;
          points: number | string;
          penalty: number | string;
          type: string;
        }>
          validationSchema={yup.object().shape({
            question: yup.string().min(2).required(),
            points: yup
              .number()
              .typeError("Points must be a number")
              .integer()
              .moreThan(-1)
              .required(),
            penalty: yup
              .number()
              .typeError("Penalty must be a number")
              .integer()
              .moreThan(-1)
              .required(),
            type: yup.string().oneOf(["free_response", "short_answer"]).required(),
          })}
          initialValues={{
            question: defaultData.question || "",
            points: defaultData.points || 1,
            penalty: defaultData.penalty || 0,
            type: defaultData.type || "short_answer",
          }}
          onSubmit={async (values) => {
            console.log(values);
            if (!isEdit) {
              const result = await createProblem({
                variables: {
                  args: {
                    contestId: id,
                    ...values,
                    points:
                      typeof values.points === "string" ? parseInt(values.points) : values.points,
                    penalty:
                      typeof values.penalty === "string"
                        ? parseInt(values.penalty)
                        : values.penalty,
                    rank: afterRank(data?.findProblems || []),
                  },
                },
              });
              setIsOpen(false);
              console.log(result);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className={`w-full space-y-5`}>
              {/* <FormikInput name="question" label="Question" themeSize="full" textarea /> */}
              <div>
                <p className="text-gray-700 mt-5 mb-1 text-sm font-medium">Question</p>
                <QuillNoSSRWrapper
                  modules={modules}
                  value={values.question}
                  onChange={(value) => setFieldValue("question", value)}
                  formats={formats}
                  bounds=".ql-editor"
                  theme="snow"
                />
              </div>
              <div className="flex space-x-2">
                <NativeSelect
                  className={`w-40`}
                  label="Type"
                  onChange={(e) => setFieldValue("type", e.target.value)}
                >
                  <option value="short_answer" className={`hover:bg-primary-900`}>
                    Short Answer
                  </option>
                  <option value="free_response" className={`hover:bg-primary-900`}>
                    Free Response
                  </option>
                </NativeSelect>
                <FormikInput name="points" label="Points" themeSize="full" useTooltip />
                <FormikInput name="penalty" label="Penalty" themeSize="full" useTooltip />
              </div>
              {!isEdit ? (
                <>
                  <Button type="submit" className={`mr-2`}>
                    Create Problem
                  </Button>
                  <Button
                    color="default"
                    type="submit"
                    className="border-none"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <AutoSave debounceMs={1000} />
              )}
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
