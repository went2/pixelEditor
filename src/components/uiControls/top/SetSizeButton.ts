import { EditorConfig, EditorState, UIComponent } from "@/types";
import elt from "@/utils/createElement";

class SetSizeButton implements UIComponent {
  public dom: HTMLButtonElement;
  private size: number;

  constructor(state: EditorState, { dispatch }: EditorConfig, size: number) {
    this.size = size;
    this.dom = elt(
      "button",
      {
        onclick: () => dispatch({ size: Number(this.dom.textContent) }),
        className: this.size === state.currentSize ? "selected" : "",
      },
      size.toString()
    ) as HTMLButtonElement;
  }

  public syncState(): void {}
}

export default SetSizeButton;
