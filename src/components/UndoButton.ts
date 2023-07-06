import elt from "../utils/createElement";
import { EditorConfig, EditorState, UIComponent } from "../types";

class UndoButton implements UIComponent {
  public dom: HTMLButtonElement;
  constructor(state: EditorState, { dispatch }: EditorConfig) {
    this.dom = <HTMLButtonElement>elt(
      "button",
      {
        onclick: () => dispatch({ undo: true }),
        disabled: state.done.length == 0,
      },
      "⮪ Undo"
    );
  }
  syncState(state: EditorState) {
    this.dom.disabled = state.done.length == 0;
  }
}

export default UndoButton;
