import { EditorConfig, EditorState, UIComponent } from "@/types";
import elt from "@/utils/createElement";
import ClearButton from "./ClearButton";
import UndoButton from "./UndoButton";

class RightControls implements UIComponent {
  public dom: HTMLElement;
  private controls: UIComponent[];

  constructor(state: EditorState, config: EditorConfig) {
    this.controls = [
      new ClearButton(state, config),
      new UndoButton(state, config),
    ];

    this.dom = elt(
      "div",
      {
        className: "right-controls",
      },
      ...this.controls.map((control) => control.dom)
    );
  }

  public syncState(state: EditorState): void {
    for (let ctrl of this.controls) {
      ctrl.syncState(state);
    }
  }
}

export default RightControls;
