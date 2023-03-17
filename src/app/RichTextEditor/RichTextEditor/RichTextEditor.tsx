import * as React from 'react';
import {
    RichUtils,
    getDefaultKeyBinding,
    EditorState,
    DraftEditorCommand,
    ContentBlock,
    DraftHandleValue,
    Modifier,
    AtomicBlockUtils,
    Entity,
} from "draft-js";
//import "./RichTextEditor.scss";
//import "draft-js/dist/Draft.css";
import { RichTextEditorBlockStyleControls } from "../RichTextEditorBlockStyleControls/RichTextEditorBlockStyleControls";
import { RichTextEditorInlineStyleControls } from "../RichTextEditorInlineStyleControls/RichTextEditorInlineStyleControls";
import {
    RichTextEditorPropsModel,
    RichTextEditorStateModel,
} from "./RichTextEditor.models";

import Editor from "@draft-js-plugins/editor";
import createImagePlugin from "@draft-js-plugins/image";
import { colorPickerPlugin } from "draft-js-color-picker"; // no @types lib for this
import createLinkPlugin from "@draft-js-plugins/anchor";

const linkPlugin = createLinkPlugin();
const imagePlugin = createImagePlugin();

const plugins = [imagePlugin, linkPlugin];

export class RichTextEditor extends React.Component<
    RichTextEditorPropsModel,
    RichTextEditorStateModel
> {
    rootClasses = ["RichEditor-root"];
    focusedClass = "focused";
    label;
    picker;
    onChange;
    toggleInlineStyle;
    handleKeyCommand;
    mapKeyToEditorCommand;
    toggleBlockType;
    uploadImage;
    getEditorState;

    handleBlur = () => {
        this.rootClasses = this.rootClasses.filter((value) => {
            return value !== this.focusedClass;
        });
    };

    handleFocus = () => {
        if (
            !this.rootClasses.find((value) => {
                return value === this.focusedClass;
            })
        ) {
            this.rootClasses.push(this.focusedClass);
        }
    };

    insertImage(editorState: EditorState, src: string) {
        const entityKey = Entity.create("image", "IMMUTABLE", { src });
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
            editorState,
            entityKey,
            " "
        );
        return newEditorState;
    }

     /* onAddLink = (editorState: EditorState, link: string) => {
        const selection = editorState.getSelection();
        if (!link) {
            this.onChange(RichUtils.toggleLink(editorState, selection, null));
            return "handled";
        }
        const content = editorState.getCurrentContent();
        const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
            url: link,
        });
        const newEditorState = EditorState.push(
            editorState,
            contentWithEntity,
            "create-entity"
        );
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
    }; */
 
    constructor(props: RichTextEditorPropsModel) {
        super(props);
        this.state = { editorState: this.props.editorState };
        this.label = this.props.label;

        this.onChange = (editorState: EditorState) => {
            this.setState({ editorState });
            this.props.handleEditorChange(editorState);
        };

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
        this.uploadImage = this._uploadImage.bind(this);
        this.getEditorState = () => this.state.editorState;

        this.picker = colorPickerPlugin(this.onChange, this.getEditorState);
    }

    static getDerivedStateFromProps(props: RichTextEditorPropsModel) {
        return { editorState: props.editorState };
    }

    _handleKeyCommand(
        command: DraftEditorCommand,
        editorState: EditorState,
        eventTimeStamp: number
    ): DraftHandleValue {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return "handled";
        }
        if (command.valueOf() === "Tab") {
            let newContentState = Modifier.replaceText(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                "    "
            );
            if (
                newContentState &&
                newContentState !== editorState.getCurrentContent()
            ) {
                this.onChange(
                    EditorState.push(editorState, newContentState, "insert-characters")
                );
            }
            return "handled";
        }
        return "not-handled";
    }

    _mapKeyToEditorCommand(e: React.KeyboardEvent) {
        if (e.key === "Tab" /* TAB */) {
            return e.key;
        }
        return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType: string) {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    }

    _toggleInlineStyle(inlineStyle: string) {
        this.onChange(
            RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
        );
    }

    _uploadImage(url: string) {
        const newEditorState = this.insertImage(this.state.editorState, url);
        this.onChange(newEditorState);
    }

    override render() {
        const { editorState } = this.state;
        const styleMap = {
            CODE: {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
                fontSize: 16,
                padding: 2,
            },
        };
        function getBlockStyle(block: ContentBlock) {
            switch (block.getType()) {
                case "blockquote":
                    return "RichEditor-blockquote";
                default:
                    return "";
            }
        }

        let className = "RichEditor-editor";
        let contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== "unstyled") {
                className += " RichEditor-hidePlaceholder";
            }
        }

        return (
            <div className="RichTextEditorWrapper">
                {this.label && (
                    <div className="Polaris-Labelled__LabelWrapper">
                        <div className="Polaris-Label">
                            <label className="Polaris-Label__Text">{this.label}</label>
                        </div>
                    </div>
                )}
                <div
                    className={this.rootClasses.join(" ")}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                >
                    <RichTextEditorBlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                        uploadImage={this.uploadImage}
                        //onAddLink={this.onAddLink}
                    />
                    <RichTextEditorInlineStyleControls
                        editorState={editorState}
                        picker={this.picker}
                        onToggle={this.toggleInlineStyle}
                    />
                    <div className={className}>
                        <Editor
                            blockStyleFn={getBlockStyle}
                            plugins={plugins}
                            customStyleMap={styleMap}
                            customStyleFn={this.picker.customStyleFn}
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            keyBindingFn={this.mapKeyToEditorCommand}
                            onChange={this.onChange}
                            placeholder=""
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default RichTextEditor;
