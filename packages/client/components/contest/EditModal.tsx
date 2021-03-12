import { formatDistanceToNow } from "date-fns";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Field, Form, Formik, useFormikContext, yupToFormErrors } from "formik";
import {
  PencilAltOutline,
  PlusOutline,
  QuestionMarkCircle,
  XOutline,
} from "heroicons-react";
import * as Yup from "yup";
import { debounce, isEqual } from "lodash";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ReactTooltip from "react-tooltip";
import { Problem } from "../../types";
import { mutator } from "../../utils/mutator";
import { Button } from "../form/Button";
import { Input } from "../form/Input";
import { RichText } from "../form/RichText";
import { Modal } from "../general/Modal";

const AutoSave: React.FC<{ debounceMs: number }> = ({ debounceMs }) => {
  const formik = useFormikContext();
  const [lastSaved, setLastSaved] = React.useState<Date | null>(null);
  const [prev, setPrev] = useState<any>(null);
  const debouncedSubmit = React.useCallback(
    debounce(() => {
      formik.submitForm().then(() => setLastSaved(new Date()));
    }, debounceMs),
    [debounceMs, formik.submitForm]
  );

  useEffect(() => {
    const curr = (formik.values as any).question as EditorState;
    if (prev === null) {
      setPrev(formik.values);
    } else if (prev.question.getCurrentContent() !== curr.getCurrentContent()) {
      debouncedSubmit();
      setPrev(formik.values);
    } else {
      const copyPrev = { ...prev };
      const copyCurr = { ...(formik.values as any) };
      delete copyPrev.question;
      delete copyCurr.question;

      if (!isEqual(copyCurr, copyPrev)) {
        debouncedSubmit();
        setPrev(formik.values);
      }
    }
  }, [debouncedSubmit, formik.values]);

  let result = null;

  if (!!formik.isSubmitting) {
    result = "Saving...";
  } else if (Object.keys(formik.errors).length > 0) {
    result = `Error while saving`;
  } else if (lastSaved !== null) {
    result = `Last saved ${formatDistanceToNow(lastSaved || new Date(), {
      addSuffix: true,
    })}`;
  }

  return (
    <div className="flex items-center mt-2">
      <p className="text-sm text-gray-400">{result}</p>
      {result && (
        <div>
          <QuestionMarkCircle
            size={15}
            className="ml-1 text-gray-400"
            data-for="about"
            data-tip
          />
          <ReactTooltip
            id="about"
            place="bottom"
            type="light"
            effect="solid"
            aria-haspopup
          >
            💾 &nbsp; Contest Pug auto-saves your work!
          </ReactTooltip>
        </div>
      )}
    </div>
  );
};

export const EditModal: React.FC<{ id: string; index: number }> = ({
  id,
  index,
}) => {
  const [open, setOpen] = useState(false);
  const cache = useQueryClient();
  const { mutateAsync } = useMutation(mutator);
  const { data, isLoading } = useQuery<Problem[]>(`/problems/${id}`);
  const schema = Yup.object().shape({
    id: Yup.number(),
    contestId: Yup.string().uuid(),
    points: Yup.number().max(1000).min(0).required(),
    question: Yup.mixed(),
    penalty: Yup.number().max(1000).min(0).required(),
    type: Yup.string().oneOf([
      "text",
      "rich_text",
      "date",
      "checkbox",
      "radio",
    ]),
    choices: Yup.array()
      .of(
        Yup.object({
          name: Yup.string(),
          correct: Yup.bool(),
        })
      )
      .nullable(),
    answers: Yup.array()
      .of(
        Yup.object({
          answer: Yup.string(),
          percentage: Yup.number(),
        })
      )
      .nullable(),
  });

  return (
    <div>
      <Button
        size="xs"
        color="blue"
        onClick={() => setOpen(true)}
        leftIcon={<PencilAltOutline size={14} />}
      >
        Edit
      </Button>
      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        className="focus:outline-none relative p-4 rounded"
      >
        <Button
          size="iconSm"
          className="absolute top-2 right-2"
          color="transparent"
          onClick={() => setOpen(false)}
        >
          <XOutline size={18} />
        </Button>
        {!isLoading && data && (
          <>
            <Formik
              initialValues={{
                ...data[index],
                question: EditorState.createWithContent(
                  convertFromRaw(JSON.parse(data[index].question))
                ),
              }}
              validationSchema={schema}
              onSubmit={(values) => {
                const body = {
                  ...values,
                  question: JSON.stringify(
                    convertToRaw(values.question.getCurrentContent())
                  ),
                } as Problem;
                return mutateAsync(["/problems/update", body, "PUT"], {
                  onSuccess: () => {
                    cache.setQueryData<Problem[]>(
                      `/problems/${data[index].contestId}`,
                      (old: Problem[]) => {
                        old[index] = body;
                        return old;
                      }
                    );
                  },
                });
              }}
            >
              {({ handleBlur, setFieldValue, values }) => (
                <Form>
                  <RichText
                    onBlur={handleBlur}
                    onChange={setFieldValue}
                    editorState={values.question}
                    name="question"
                  />
                  <br />
                  <div className="flex items-center space-x-3">
                    <Input
                      name="points"
                      label="Points"
                      className="w-12 text-center"
                      autoresize
                    />
                    <Input
                      name="penalty"
                      label="Penalty"
                      className="w-12 text-center"
                      autoresize
                    />
                    <div>
                      <label
                        htmlFor="type"
                        className="text-sm font-bold mb-1 inline-block"
                      >
                        Type
                      </label>
                      <Field
                        name="type"
                        as="select"
                        className="form-select block bg-gray-800 border border-gray-700 w-44 rounded"
                      >
                        <option value="text">Short Answer</option>
                        <option value="rich_text">Rich Text</option>
                        <option value="radio">Multiple Choice</option>
                      </Field>
                    </div>
                  </div>
                  <br />
                  <h3 className="text-sm font-bold mb-2.5">Auto Grade</h3>
                  <Button
                    type="button"
                    size="sm"
                    leftIcon={<PlusOutline size={18} />}
                  >
                    Add Answer
                  </Button>
                  <AutoSave debounceMs={800} />
                </Form>
              )}
            </Formik>
          </>
        )}
      </Modal>
    </div>
  );
};
