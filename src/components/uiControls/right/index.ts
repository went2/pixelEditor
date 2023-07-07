import { EditorConfig, EditorState, UIComponent } from "@/types";
import elt from "@/utils/createElement";
import ClearButton from "./ClearButton";
import UndoButton from "./UndoButton";

class RightControls implements UIComponent {
  public dom: HTMLElement;

  constructor(state: EditorState, config: EditorConfig) {
    this.dom = elt(
      "div",
      {
        className: "right-controls",
      },
      new ClearButton(state, config).dom,
      new UndoButton(state, config).dom
    );
  }

  public syncState(): void {}
}

export default RightControls;
