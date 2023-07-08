import elt from "@/utils/createElement";
import { UIComponent, EditorState, EditorConfig, ActionObj } from "@/types";

class ColorSelect implements UIComponent {
  public input: HTMLInputElement;
  public dom: HTMLElement;
  constructor(state: EditorState, { dispatch }: EditorConfig) {
    this.input = elt("input", {
      type: "color",
      value: state.color,
      onchange: () =>
        dispatch({
          type: "select-tool",
          payload: {
            color: this.input.value,
          },
        }),
    }) as HTMLInputElement;

    this.dom = elt("label", null, "🎨 Color: ", this.input);
  }
  public syncState(state: EditorState) {
    this.input.value = state.color;
  }
}

export default ColorSelect;
