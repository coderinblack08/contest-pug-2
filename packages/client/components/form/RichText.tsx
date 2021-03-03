import React, { useRef, useState } from "react";
import { EditorState, RichUtils } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import { Button } from "./Button";
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/linkify/lib/plugin.css";

interface RichTextProps {
  placeholder?: string;
}

const linkifyPlugin = createLinkifyPlugin();

export const RichText: React.FC<RichTextProps> = ({
  placeholder = "Example...",
}) => {
  const editor = useRef(null);
  const [selected, setSelected] = useState<Record<string, boolean>>({
    bold: false,
    italic: false,
    underline: false,
  });
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  return (
    <div className="RichEditor-root">
      {Object.keys(selected).map((x) => (
        <Button
          key={x}
          size="iconSm"
          color={selected[x] ? "blue" : "transparent"}
          className="mb-2 bg-gray-700 mr-2"
          onMouseDown={(e) => {
            setEditorState(
              RichUtils.toggleInlineStyle(editorState, x.toUpperCase())
            );
            setSelected({ ...selected, [x]: !selected[x] });
            e.preventDefault();
          }}
        >
          <img src={`/static/${x}.svg`} alt={x} className="w-3 h-3" />
        </Button>
      ))}
      <Editor
        editorState={editorState}
        placeholder={placeholder}
        handleKeyCommand={(command, _) => {
          const newState = RichUtils.handleKeyCommand(editorState, command);

          if (Object.keys(selected).includes(command)) {
            setSelected({ ...selected, [command]: !selected[command] });
          }

          if (newState) {
            setEditorState(newState);
            return "handled";
          }

          return "not-handled";
        }}
        onChange={setEditorState}
        plugins={[linkifyPlugin]}
        ref={editor}
        spellCheck
      />
    </div>
  );
};
