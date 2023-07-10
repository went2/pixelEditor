import elt from "@/utils/createElement";
import { UIComponent, EditorState, EditorConfig } from "@/types";

class ColorSelect implements UIComponent {
  public input: HTMLInputElement;
  public dom: HTMLElement;
  constructor(state: EditorState, { dispatch }: EditorConfig) {
    this.input = elt("input", {
      type: "color",
      value: state.color,
      hidden: true,
      onchange: () =>
        dispatch({
          type: "select-color",
          payload: {
            color: this.input.value,
          },
        }),
    }) as HTMLInputElement;

    this.dom = elt(
      "label",
      {
        className: "color-select",
      },
      "🎨",
      this.input
    );
  }
  public syncState(state: EditorState) {
    if (state.color == this.input.value) {
      return;
    }
    console.log("state color", state.color, "input value", this.input.value);

    this.input.value = state.color;
  }
}

export default ColorSelect;
