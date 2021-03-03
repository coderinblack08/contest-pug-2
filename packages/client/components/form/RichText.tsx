import Editor from "@draft-js-plugins/editor";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import "@draft-js-plugins/linkify/lib/plugin.css";
import { EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { useRef } from "react";
import { Button } from "./Button";

interface RichTextProps {
  placeholder?: string;
  onChange: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  onBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  editorState: EditorState;
  name: string;
}

const linkifyPlugin = createLinkifyPlugin();

export const RichText: React.FC<RichTextProps> = ({
  placeholder = "Example...",
  editorState,
  onChange,
  onBlur,
  name,
}) => {
  const editorRef = useRef<Editor>(null);
  const currentStyle = editorState.getCurrentInlineStyle();

  const setEditorState = (x: EditorState) => onChange(name, x);

  return (
    <div className="RichEditor-root">
      <select
        className="form-select pl-0 inline bg-transparent text-sm rounded"
        onChange={(x) => console.log(x)}
      >
        <option value="Paragraph">Paragraph</option>
        <option value="Paragraph">Heading 1</option>
      </select>
      {inlineStyles.map(({ label, style }) => (
        <Button
          key={label}
          size="iconSm"
          type="button"
          color={currentStyle.has(style) ? "blue" : "transparent"}
          className="mb-2 mr-2"
          onMouseDown={(e) => {
            setEditorState(RichUtils.toggleInlineStyle(editorState, style));
            e.preventDefault();
          }}
        >
          <img src={`/static/${label}.svg`} alt={label} className="w-3 h-3" />
        </Button>
      ))}
      <div
        className="border border-gray-700 rounded p-2 mt-1 max-h-20 overflow-y-auto"
        onClick={() => {
          if (editorRef.current) {
            editorRef.current.focus();
          }
        }}
      >
        <Editor
          onBlur={onBlur}
          editorState={editorState}
          placeholder={placeholder}
          handleKeyCommand={(command, _) => {
            const newState = RichUtils.handleKeyCommand(editorState, command);

            if (newState) {
              setEditorState(newState);
              return "handled";
            }

            return "not-handled";
          }}
          ref={editorRef}
          onChange={setEditorState}
          plugins={[linkifyPlugin]}
          spellCheck
        />
      </div>
    </div>
  );
};

const inlineStyles = [
  { label: "bold", style: "BOLD" },
  { label: "italic", style: "ITALIC" },
  { label: "underline", style: "UNDERLINE" },
];

const blockTypes = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];
