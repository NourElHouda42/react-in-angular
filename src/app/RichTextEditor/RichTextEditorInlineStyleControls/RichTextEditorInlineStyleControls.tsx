import * as React from "react";
import { RichTextEditorStyleButton } from "../RichTextEditorStyleButton/RichTextEditorStyleButton";
import { RICHTEXT_INLINE_STYLES } from "../../constants/richTextInlineStyles";
//import "./RichTextEditorInlineStyleControls.scss";
import { RichTextEditorInlineStyleControlsPropsModels } from "./RichTextEditorInlineStyleControls.models";
import { TextColorPicker } from "../ColorPicker/TextColorPicker";

export function RichTextEditorInlineStyleControls(props: RichTextEditorInlineStyleControlsPropsModels) {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls">
            {RICHTEXT_INLINE_STYLES.map((type) => (
                <RichTextEditorStyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            ))}
{/*             <TextColorPicker 
                editorState={props.editorState} 
                picker={props.picker} 
            /> */}
        </div>
    );
}
