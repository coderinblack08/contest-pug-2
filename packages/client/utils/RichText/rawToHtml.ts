import { convertFromRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { exporter } from "../../components/form/RichText";

export const rawToHtml = (raw: string) =>
  stateToHTML(convertFromRaw(JSON.parse(raw)), {
    inlineStyles: exporter(
      EditorState.createWithContent(convertFromRaw(JSON.parse(raw)))
    ),
  });
