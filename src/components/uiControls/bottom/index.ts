import { EditorState, UIComponent, EditorConfig } from "@/types";
import elt from "@/utils/createElement";
import SaveButton from "./SaveButton";

class BottomControls implements UIComponent {
  public dom: HTMLElement;
  private controls: UIComponent[];

  constructor(state: EditorState, config: EditorConfig) {
    this.controls = [new SaveButton(state)];

    this.dom = elt(
      "div",
      {
        className: "bottom-controls",
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

export default BottomControls;
