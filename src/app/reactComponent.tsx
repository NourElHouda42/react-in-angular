import * as React from "react";
import { EditorState } from "draft-js";
import { RichTextEditor } from "./RichTextEditor/RichTextEditor/RichTextEditor";

export function App() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const handleEditorChange = React.useCallback((editorState: EditorState) => {
    setEditorState(editorState);
  }, []);
  return (
    <>
      <RichTextEditor
        editorState={editorState}
        handleEditorChange={handleEditorChange}
      />
    </>
  );
}
