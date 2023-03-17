import { DraftInlineStyle } from "draft-js";

export interface RichTextEditorInlineStyleControlsPropsModels {
    editorState: {
        getCurrentInlineStyle: () => DraftInlineStyle
    },
    picker: any,
    onToggle: (inlineStyle: string) => void
}
