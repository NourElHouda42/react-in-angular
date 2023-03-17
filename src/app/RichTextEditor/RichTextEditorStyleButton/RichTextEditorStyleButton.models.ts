export interface RichTextEditorStyleButtonPropsModel {
    style: string,
    label: string,
    active: boolean,
    onToggle: (inlineStyle: string) => void
}
