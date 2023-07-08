import Picture from "@/models/picture";
import { ActionObj, EditorConfig, EditorState, UIComponent } from "@/types";
import elt from "@/utils/createElement";

class SetSizeButton implements UIComponent {
  public dom: HTMLButtonElement;
  private size: number;

  constructor(state: EditorState, { dispatch }: EditorConfig, size: number) {
    this.size = size;

    const action: ActionObj = {
      type: "set-size",
      payload: {
        currentSize: this.size,
      },
    };

    this.dom = elt(
      "button",
      {
        onclick: () => dispatch(action),
        className: this.size === state.currentSize ? "selected" : "",
      },
      `${size.toString()} X ${size.toString()}`
    ) as HTMLButtonElement;
  }

  public syncState(state: EditorState): void {
    this.dom.className = this.size === state.currentSize ? "selected" : "";
  }
}

export default SetSizeButton;
