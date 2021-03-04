import { convertFromRaw, convertToRaw, Editor, EditorState } from "draft-js";
import { Form, Formik, useFormikContext } from "formik";
import { PencilAltOutline, PlusOutline, XOutline } from "heroicons-react";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Problem } from "../../types";
import { mutator } from "../../utils/mutator";
import { Button } from "../form/Button";
import { RichText } from "../form/RichText";
import { Modal } from "../general/Modal";

const AutoSave: React.FC<{ debounceMs: number }> = ({ debounceMs }) => {
  const formik = useFormikContext();
  const [lastSaved, setLastSaved] = React.useState<Date | null>(null);
  const [prev, setPrev] = useState<EditorState | null>(null);
  const debouncedSubmit = React.useCallback(
    debounce(() => {
      formik.submitForm().then(() => setLastSaved(new Date()));
    }, debounceMs),
    [debounceMs, formik.submitForm]
  );

  useEffect(() => {
    const curr = (formik.values as any).question as EditorState;
    if (prev === null) {
      setPrev(curr);
    } else if (prev.getCurrentContent() !== curr.getCurrentContent()) {
      debouncedSubmit();
      setPrev(curr);
    }
  }, [debouncedSubmit, formik.values]);

  let result = null;

  if (!!formik.isSubmitting) {
    result = "Saving...";
  } else if (Object.keys(formik.errors).length > 0) {
    result = `ERROR: ${formik.errors}`;
  } else if (lastSaved !== null) {
    result = `Last saved ${formatDistanceToNow(lastSaved || new Date(), {
      addSuffix: true,
    })}`;
  }

  return <p className="text-sm text-gray-300 mt-2">{result}</p>;
};

export const EditModal: React.FC<{ id: string; index: number }> = ({
  id,
  index,
}) => {
  const [open, setOpen] = useState(false);
  const cache = useQueryClient();
  const { mutateAsync } = useMutation(mutator);
  const { data, isLoading } = useQuery<Problem[]>(`/problems/${id}`);

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
                  <AutoSave debounceMs={800} />
                  <h3 className="text-sm font-bold mt-5 mb-2.5">Auto Grade</h3>
                  <Button size="sm" leftIcon={<PlusOutline size={18} />}>
                    Add Answer
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )}
      </Modal>
    </div>
  );
};
