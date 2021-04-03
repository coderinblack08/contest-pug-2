import { LexoRank } from "lexorank";
import React, { useEffect, useState } from "react";
import { PlusOutline } from "heroicons-react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Delete, EditSquare, Setting } from "react-iconly";
import {
  FindProblemsDocument,
  FindProblemsQuery,
  useFindProblemsQuery,
  useUpdateProblemMutation,
} from "../../generated/graphql";
import { Button } from "../Button";
import deepclone from "lodash.clonedeep";
import { ProblemsEditorModal } from "./ProblemsEditorModal";
interface ProblemsEditorProps {
  id: string;
}

const formatProblemType = (type: string) => {
  let formatted;
  switch (type) {
    case "short_answer":
      formatted = "Short Answer";
      break;
    case "free_response":
      formatted = "Free Response";
      break;
  }
  return formatted;
};

export const ProblemsEditor: React.FC<ProblemsEditorProps> = ({ id }) => {
  const { data } = useFindProblemsQuery({ variables: { contestId: id } });
  const [problems, setProblems] = useState(data?.findProblems); // removes delay when dragged
  const [update] = useUpdateProblemMutation();

  useEffect(() => setProblems(data?.findProblems), [data]);

  return (
    <div className="p-12 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Problems</h1>
        <ProblemsEditorModal
          opener={(setIsOpen) => (
            <Button
              color="default"
              onClick={() => setIsOpen(true)}
              icon={<PlusOutline />}
              size="sm"
              rounded
            />
          )}
          id={id}
        />
      </div>
      <DragDropContext
        onDragEnd={async ({ source, destination }) => {
          if (!destination) {
            return;
          }
          if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
          ) {
            return;
          }

          const newProblems = deepclone(data?.findProblems) as any;
          newProblems.splice(source.index, 1);
          newProblems.splice(destination.index, 0, data?.findProblems[source.index]);

          let newLexorank: LexoRank;

          if (destination.index === 0) {
            newLexorank = LexoRank.parse(newProblems[destination.index + 1].rank).genPrev();
          } else if (destination.index === newProblems.length - 1) {
            newLexorank = LexoRank.parse(newProblems[destination.index - 1].rank).genNext();
          } else {
            const left = LexoRank.parse(newProblems[destination.index - 1].rank);
            const right = LexoRank.parse(newProblems[destination.index + 1].rank);
            newLexorank = left.between(right);
          }

          const problem = deepclone(newProblems[destination.index]);

          if (problem) {
            problem.rank = newLexorank.toString();
            newProblems[destination.index] = problem;
            console.log(newProblems);
            setProblems(newProblems);

            await update({
              variables: {
                args: {
                  question: problem.question,
                  type: problem.type,
                  points: problem.points,
                  penalty: problem.penalty,
                  rank: newLexorank.toString(),
                },
                id: problem.id,
              },
              update(cache) {
                cache.writeQuery<FindProblemsQuery>({
                  query: FindProblemsDocument,
                  variables: { contestId: id },
                  data: {
                    __typename: "Query",
                    findProblems: newProblems,
                  },
                });
              },
            });
          }
        }}
      >
        <div className="rounded-lg p-3 pb-0.5 my-4 bg-gray-100">
          <Droppable droppableId="problems">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {problems?.map((problem, index) => (
                  <Draggable draggableId={problem.id.toString()} key={problem.id} index={index}>
                    {(draggableProvided) => (
                      <div
                        className="bg-white rounded-lg py-3 px-5 shadow-sm mb-2.5"
                        {...draggableProvided.dragHandleProps}
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}
                      >
                        <div className="flex items-end justify-between">
                          <p className="text-sm font-medium">{formatProblemType(problem.type)}</p>
                          <div className="flex items-center space-x-1">
                            <Button
                              icon={<Setting size={14} set="curved" stroke="bold" />}
                              tooltip="Auto Grade"
                              tip={`${problem.id}-auto-grade-button`}
                              color="default"
                              size="xs"
                            />
                            <ProblemsEditorModal
                              opener={(setIsOpen) => (
                                <Button
                                  icon={<EditSquare size={14} set="curved" stroke="bold" />}
                                  onClick={() => setIsOpen(true)}
                                  tooltip="Edit"
                                  tip={`${problem.id}-edit-button`}
                                  size="xs"
                                />
                              )}
                              defaultData={data?.findProblems[index]}
                              id={id}
                            />
                            <Button
                              size="xs"
                              color="red"
                              tooltip="Delete"
                              tip={`${problem.id}-delete-button`}
                              icon={<Delete size={14} set="curved" stroke="bold" />}
                            />
                          </div>
                        </div>
                        <p className="text-gray-800 mt-1.5">{problem.question}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};
