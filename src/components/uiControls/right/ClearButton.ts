import { EditorState, UIComponent, EditorConfig } from "@/types";
import elt from "@/utils/createElement";

class ClearButton implements UIComponent {
  public dom: HTMLButtonElement;

  constructor(state: EditorState, { dispatch }: EditorConfig) {
    this.dom = elt(
      "button",
      {
        onclick: () => dispatch({ type: "clear" }),
      },
      "⎚ Clear"
    ) as HTMLButtonElement;
  }
  public syncState(): void {}
}

export default ClearButton;
