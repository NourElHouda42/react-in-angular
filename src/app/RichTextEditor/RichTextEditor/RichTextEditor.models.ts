import { EditorState } from "draft-js";

export interface RichTextEditorPropsModel {
    editorState: EditorState,
    label?: string,
    handleEditorChange: (editorState: EditorState) => void
}

export interface RichTextEditorStateModel {
    editorState: EditorState
}
