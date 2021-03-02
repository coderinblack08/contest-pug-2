import {
  PencilAltOutline,
  PhotographOutline,
  PlusOutline,
  TrashOutline,
} from "heroicons-react";
import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { Tabs } from "../../components/contest/Tabs";
import { Layout } from "../../components/general/Layout";
import { Navbar } from "../../components/general/Navbar";
import { LexoRank } from "lexorank";
import { mutator } from "../../utils/mutator";
import { Problem } from "../../types";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { Form, Formik } from "formik";

interface Props {
  slug: string;
}

const createProblemButtons = {
  "Short Answer": {
    color: "green",
    type: "text",
  },
  "Rich Text": {
    color: "purple",
    type: "rich_text",
  },
  "Multiple Choice": {
    color: "yellow",
    type: "radio",
  },
};

const typeToName = {
  text: "Short Answer",
  rich_text: "Rich Text",
  radio: "Multiple Choice",
};

const ContestPage: NextPage<Props> = ({ slug }) => {
  const { data: problems } = useQuery<Problem[]>(`/problems/${slug}`);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { mutate, isLoading } = useMutation(mutator);
  const queryClient = useQueryClient();

  return (
    <div>
      <Navbar />
      <Layout>
        <Tabs slug={slug} />
        <Formik
          initialValues={{ problems: problems || [] }}
          onSubmit={(values) => {
            console.log(values);
          }}
          enableReinitialize
        >
          {({ setValues, values }) => (
            <Form className="mt-5 bg-gray-800 p-2.5 pb-0.5 rounded-md">
              <DragDropContext
                onDragEnd={({ source, destination }) => {
                  if (!destination) {
                    return;
                  }
                  if (
                    destination.droppableId === source.droppableId &&
                    destination.index === source.index
                  ) {
                    return;
                  }

                  const newProblems = [...values.problems];
                  newProblems.splice(source.index, 1);
                  newProblems.splice(
                    destination.index,
                    0,
                    values.problems[source.index]
                  );
                  console.log(newProblems);

                  setValues({ ...values, problems: newProblems });
                }}
              >
                <Droppable droppableId="problems">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {values.problems?.map((problem, i) => (
                        <Draggable
                          draggableId={problem.id.toString()}
                          key={problem.id}
                          index={i}
                        >
                          {(draggableProvided) => (
                            <div
                              className="w-full relative p-4 rounded-md bg-gray-900 cursor-move mb-2"
                              {...draggableProvided.dragHandleProps}
                              {...draggableProvided.draggableProps}
                              ref={draggableProvided.innerRef}
                            >
                              <strong className="mr-2">{i + 1}.</strong>
                              <span className="text-gray-300">
                                {problem.question}
                              </span>
                              <input
                                type="text"
                                className="block bg-gray-800 border border-gray-700 rounded mt-3 w-64 py-1 px-2"
                                placeholder={typeToName[problem.type]}
                                disabled
                              />
                              <div className="flex items-center space-x-2 absolute top-3 right-3">
                                <button className="inline-flex items-center bg-blue-600 px-3 py-1 rounded font-bold text-sm">
                                  <PencilAltOutline
                                    size={14}
                                    className="mr-1"
                                  />
                                  Edit
                                </button>
                                <button className="inline-flex items-center bg-red-600 px-3 py-1 rounded font-bold text-sm">
                                  <TrashOutline size={14} className="mr-1" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Form>
          )}
        </Formik>
        <div className="relative flex items-center mt-10">
          <hr className="absolute border-b border-gray-800 w-full" />
          <div className="flex items-center relative z-10 mx-auto bg-gray-900 px-3 space-x-1.5">
            <Popover
              isOpen={isPopoverOpen}
              positions={["top"]}
              onClickOutside={() => setIsPopoverOpen(false)}
              content={({ position, childRect, popoverRect }) => (
                <ArrowContainer
                  position={position}
                  childRect={childRect}
                  popoverRect={popoverRect}
                  arrowColor="rgb(50, 50, 56)"
                  className="popover-arrow-container"
                  arrowClassName="popover-arrow"
                  arrowSize={10}
                >
                  <div
                    style={{ backgroundColor: "rgb(50, 50, 56)" }}
                    className="grid gap-2 grid-cols-2 rounded p-3"
                  >
                    {Object.entries(createProblemButtons).map(
                      ([name, { color, type }]) => (
                        <button
                          key={name}
                          className={`w-40 rounded bg-${color}-600 border border-${color}-500 p-2 focus:outline-none focus:ring`}
                          onClick={() => {
                            mutate(
                              [
                                "/problems/create",
                                {
                                  type,
                                  question: "Enter your question",
                                  items:
                                    type === "radio"
                                      ? ["Enter an answer choice"]
                                      : undefined,
                                  rank: problems?.length
                                    ? LexoRank.parse(
                                        problems[problems?.length - 1].rank
                                      )
                                        .genNext()
                                        .toString()
                                    : undefined,
                                  contestId: slug,
                                },
                                "POST",
                              ],
                              {
                                onSuccess: (x) => {
                                  queryClient.setQueryData<Problem[]>(
                                    `/problems/${slug}`,
                                    (old: Problem[]) => [...old, x]
                                  );
                                  setIsPopoverOpen(false);
                                },
                              }
                            );
                          }}
                        >
                          {name}
                        </button>
                      )
                    )}
                  </div>
                </ArrowContainer>
              )}
            >
              <button
                className="inline-flex items-center justify-center border border-gray-700 bg-gray-800 w-8 h-8 rounded focus:outline-none focus:ring"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              >
                <PlusOutline size={20} />
              </button>
            </Popover>
            <button className="inline-flex items-center justify-center border border-gray-700 bg-gray-800 w-8 h-8 rounded focus:outline-none focus:ring">
              <PhotographOutline size={20} />
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const slug = query.slug;
  return { props: { slug } };
};

export default ContestPage;
