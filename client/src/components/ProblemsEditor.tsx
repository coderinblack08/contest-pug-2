import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface ProblemsEditorProps {
  id: string;
}

export const ProblemsEditor: React.FC<ProblemsEditorProps> = ({ id }) => {
  return (
    <div className="p-12 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Problems</h1>
      <div className="rounded-lg p-3 pb-0.5 mt-4 bg-gray-100">
        <div className="bg-white rounded-lg py-3 px-5 shadow-sm mb-2.5">asdf</div>
      </div>
    </div>
  );
};
