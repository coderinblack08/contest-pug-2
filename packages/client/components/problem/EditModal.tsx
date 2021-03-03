import { convertFromRaw, Editor, EditorState } from "draft-js";
import { Form, Formik } from "formik";
import { PencilAltOutline, PlusOutline, XOutline } from "heroicons-react";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Problem } from "../../types";
import { mutator } from "../../utils/mutator";
import { Button } from "../form/Button";
import { RichText } from "../form/RichText";
import { Modal } from "../general/Modal";

export const EditModal: React.FC<{ id: string; index: number }> = ({
  id,
  index,
}) => {
  const [open, setOpen] = useState(false);
  const cache = useQueryClient();
  const { mutate } = useMutation(mutator);
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
                // question: EditorState.createEmpty(),
                question: EditorState.createWithContent(
                  convertFromRaw(JSON.parse(data[index].question))
                ),
              }}
              onSubmit={() => {}}
            >
              {({ handleBlur, setFieldValue, values }) => (
                <Form>
                  <RichText
                    onBlur={handleBlur}
                    onChange={setFieldValue}
                    editorState={values.question}
                    name="question"
                  />
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
