import { EditorState } from "draft-js";

export interface RichTextEditorBlockStyleControlsPropsModels {
    editorState: EditorState,
    onToggle: (inlineStyle: string) => void,
    uploadImage: (url: string) => void,
    //onAddLink: (editorState: EditorState, link: string) => void
}
