import { EditorState, UIComponent, EditorConfig } from "@/types";
import elt from "@/utils/createElement";
import SaveButton from "./SaveButton";

class BottomControls implements UIComponent {
  public dom: HTMLElement;

  constructor(state: EditorState, config: EditorConfig) {
    this.dom = elt(
      "div",
      {
        className: "bottom-controls",
      },
      new SaveButton(state).dom
    );
  }
  public syncState(): void {}
}

export default BottomControls;
