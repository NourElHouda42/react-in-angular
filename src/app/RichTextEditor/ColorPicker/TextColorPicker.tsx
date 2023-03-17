import { TextColorPickerPropsModels } from "./TextColorPicker.models";
import ColorPicker from "draft-js-color-picker";
import * as React from "react";
import "./TextColorPicker.scss";

const presetColors = [
  "#ff00aa",
  "#F5A623",
  "#F8E71C",
  "#8B572A",
  "#7ED321",
  "#417505",
  "#BD10E0",
  "#9013FE",
  "#4A90E2",
  "#50E3C2",
  "#B8E986",
  "#000000",
  "#4A4A4A",
  "#9B9B9B",
  "#FFFFFF",
];

export function TextColorPicker(props: TextColorPickerPropsModels) {
  const [isSelected, setIsSelected] = React.useState(false);

  React.useEffect(() => {
    const currentSelection = props.editorState.getSelection();
    setIsSelected(
      currentSelection.getAnchorOffset() !== currentSelection.getFocusOffset()
    );
  }, [props.editorState]);

  return (
    <span className="RichEditor-ColorPickerButton">
      {isSelected ? (
        <ColorPicker
          toggleColor={(color: string) => props.picker.addColor(color)}
          presetColors={presetColors}
          color={props.picker.currentColor(props.editorState)}
        />
      ) : (
        // <Tooltip description="Please select the text first.">
        <div className="disabled-color-picker">
          <div
            className="current-color"
            style={{
              backgroundColor: props.picker.currentColor(props.editorState),
            }}
          ></div>
        </div>
        //</Tooltip>
      )}
    </span>
  );
}
