import Editor from "@draft-js-plugins/editor";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import "@draft-js-plugins/linkify/lib/plugin.css";
import { EditorState, RichUtils } from "draft-js";
import React, { FormEvent, useRef, useState } from "react";
import createStyles from "draft-js-custom-styles";
import { Button } from "./Button";
import "draft-js/dist/Draft.css";

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
const { styles, customStyleFn } = createStyles(["font-size"]);

export const RichText: React.FC<RichTextProps> = ({
  placeholder = "Example...",
  editorState,
  onChange,
  onBlur,
  name,
}) => {
  const editorRef = useRef<Editor>(null);
  const [showSelect, setShowSelect] = useState(false);
  const [sizeSelected, setSizeSelected] = useState(16);
  const currentStyle = editorState.getCurrentInlineStyle();

  const setEditorState = (x: EditorState) => onChange(name, x);

  const setFontSize = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    e.preventDefault();

    const newEditorState = styles.fontSize.remove(editorState);

    setEditorState(styles.fontSize.add(newEditorState, value));
  };

  const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 38, 46, 54, 62, 72];

  return (
    <div className="RichEditor-root">
      <div className="flex items-center">
        <div className="flex items-center">
          <div className="pr-2">
            {inlineStyles.map(({ label, style }) => (
              <Button
                key={label}
                size="iconSm"
                type="button"
                color={currentStyle.has(style) ? "blue" : "transparent"}
                onClick={(e) => {
                  setEditorState(
                    RichUtils.toggleInlineStyle(editorState, style)
                  );
                  e.preventDefault();
                }}
              >
                <img
                  src={`/static/${label}.svg`}
                  alt={label}
                  className="w-3 h-3"
                />
              </Button>
            ))}
          </div>
          <div className="h-5 border-l border-gray-600" />
          <div className="relative mb-1">
            <span
              className="form-select bg-transparent rounded cursor-pointer"
              onMouseDown={(e) => {
                e.preventDefault();
                setShowSelect(!showSelect);
              }}
            >
              {sizeSelected}pt
            </span>
            {showSelect && (
              <div className="bg-gray-800 border border-gray-700 shadow-2xl rounded absolute right-0 mt-1.5 z-20 text-gray-200 py-1">
                {fontSizes.map((size) => (
                  <div
                    className={`w-full px-3 py-1 cursor-pointer ${
                      sizeSelected === size ? "bg-gray-700 font-bold" : ""
                    }`}
                    onMouseDown={(e) => {
                      setFontSize(e, size + "px");
                      setSizeSelected(size);
                      setShowSelect(false);
                    }}
                  >
                    {size}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="border border-gray-700 rounded max-h-64 overflow-y-auto p-2 mt-1"
        onClick={() => {
          if (editorRef.current) {
            editorRef.current.focus();
          }
        }}
      >
        <Editor
          onBlur={onBlur}
          editorState={editorState}
          customStyleFn={customStyleFn}
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
