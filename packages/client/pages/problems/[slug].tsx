import { ContentState, convertFromHTML, convertToRaw } from "draft-js";
import { Form, Formik } from "formik";
import { PlusOutline, TemplateOutline, TrashOutline } from "heroicons-react";
import { LexoRank } from "lexorank";
import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { EditModal } from "../../components/contest/EditModal";
import { Tabs } from "../../components/contest/Tabs";
import { Button } from "../../components/form/Button";
import { Layout } from "../../components/general/Layout";
import { Navbar } from "../../components/general/Navbar";
import { Spinner } from "../../components/general/Spinner";
import { Problem } from "../../types";
import { mutator } from "../../utils/mutator";
import { rawToHtml } from "../../utils/RichText/rawToHtml";

interface Props {
  slug: string;
}

const ContestPage: NextPage<Props> = ({ slug }) => {
  const { data: problems, isLoading } = useQuery<Problem[]>(
    `/problems/${slug}`
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { mutate } = useMutation(mutator);
  const queryClient = useQueryClient();

  return (
    <div>
      <Navbar />
      <Layout>
        <Tabs slug={slug} />
        <Formik
          initialValues={{ problems: problems || [] }}
          onSubmit={(values) => {}}
          enableReinitialize
        >
          {({ setValues, values }) => (
            <Form
              className="mt-5 bg-gray-800 p-2.5 pb-0.5 rounded-md"
              style={{ display: problems?.length === 0 ? "none" : "block" }}
            >
              {isLoading && (
                <div className="flex justify-center items-center py-10">
                  <Spinner />
                </div>
              )}
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

                  let newLexorank;

                  if (destination.index === 0) {
                    newLexorank = LexoRank.parse(
                      newProblems[destination.index + 1].rank
                    ).genPrev();
                  } else if (destination.index === newProblems.length - 1) {
                    newLexorank = LexoRank.parse(
                      newProblems[destination.index - 1].rank
                    ).genNext();
                  } else {
                    const left = LexoRank.parse(
                      newProblems[destination.index - 1].rank
                    );
                    const right = LexoRank.parse(
                      newProblems[destination.index + 1].rank
                    );
                    newLexorank = left.between(right);
                  }

                  newProblems[destination.index].rank = newLexorank.toString();

                  mutate([
                    "/problems/update",
                    newProblems[destination.index],
                    "PUT",
                  ]);

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
                              <div className="flex justify-between items-start">
                                <div className="flex space-x-2">
                                  <article
                                    className="text-gray-300"
                                    dangerouslySetInnerHTML={{
                                      __html: rawToHtml(problem.question),
                                    }}
                                  />
                                </div>
                                <div className="flex items-center space-x-2">
                                  <EditModal id={problem.contestId} index={i} />
                                  <Button
                                    onClick={() => {
                                      mutate(
                                        [
                                          `/problems/${problem.id}`,
                                          {},
                                          "DELETE",
                                        ],
                                        {
                                          onSuccess: () => {
                                            queryClient.setQueryData<Problem[]>(
                                              `/problems/${slug}`,
                                              (old: Problem[]) => {
                                                old.splice(i, 1);
                                                return old;
                                              }
                                            );
                                          },
                                        }
                                      );
                                    }}
                                    leftIcon={<TrashOutline size={14} />}
                                    color="red"
                                    size="xs"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                              <input
                                type="text"
                                className="block bg-gray-800 border border-gray-700 rounded mt-3 w-64 py-1 px-2"
                                placeholder={typeToName[problem.type]}
                                disabled
                              />
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
                            const {
                              entityMap,
                              contentBlocks,
                            } = convertFromHTML("<p>Enter question here</p>");
                            mutate(
                              [
                                "/problems/create",
                                {
                                  type,
                                  question: JSON.stringify(
                                    convertToRaw(
                                      ContentState.createFromBlockArray(
                                        contentBlocks,
                                        entityMap
                                      )
                                    )
                                  ),
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
              <TemplateOutline size={20} />
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const slug = query.slug;
  return { props: { slug } };
};

export default ContestPage;
