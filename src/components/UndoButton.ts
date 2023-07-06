import elt from "../utils/createElement";

class UndoButton implements UIComponent {
  public dom: HTMLButtonElement;
  constructor(state, { dispatch }) {
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
