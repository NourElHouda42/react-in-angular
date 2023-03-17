import { RICHTEXT_BLOCK_TYPES } from "../../constants/richTextBlockTypes";
import * as React from "react";
import { RichTextEditorStyleButton } from "../RichTextEditorStyleButton/RichTextEditorStyleButton";
//import "./RichTextEditorBlockStyleControls.scss";
import { RichTextEditorBlockStyleControlsPropsModels } from "./RichTextEditorBlockStyleControls.models";
//import { LinkButton } from "../LinkButton/LinkButton";

export function RichTextEditorBlockStyleControls(
  props: RichTextEditorBlockStyleControlsPropsModels
) {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {RICHTEXT_BLOCK_TYPES.map((type) => (
        <RichTextEditorStyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
      {/* <LinkButton editorState={props.editorState} onAddLink={props.onAddLink} /> */}
    </div>
  );
}
