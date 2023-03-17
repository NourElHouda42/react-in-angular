import * as React from "react";
//import "./RichTextEditorStyleButton.scss";
//import "draft-js/dist/Draft.css";
import {RichTextEditorStyleButtonPropsModel} from "./RichTextEditorStyleButton.models";

export class RichTextEditorStyleButton extends React.Component<RichTextEditorStyleButtonPropsModel> {
    onToggle: React.MouseEventHandler<HTMLSpanElement>;

    constructor(props: RichTextEditorStyleButtonPropsModel) {
        super(props);
        this.onToggle = (e: React.MouseEvent) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    override render() {
        let className = "RichEditor-styleButton";
        if (this.props.active) {
            className += " RichEditor-activeButton";
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}
