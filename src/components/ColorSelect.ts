import elt from "../utils/createElement";
import { UIComponent, EditorState } from "../types";

class ColorSelect implements UIComponent {
  public input: HTMLInputElement;
  public dom: HTMLElement;
  constructor(
    state: EditorState,
    { dispatch }: { dispatch: (...args: any[]) => void }
  ) {
    this.input = elt("input", {
      type: "color",
      value: state.color,
      onchange: () => dispatch({ color: this.input.value }),
    }) as HTMLInputElement;
    this.dom = elt("label", null, "🎨 Color: ", this.input);
  }
  public syncState(state: EditorState) {
    this.input.value = state.color;
  }
}

export default ColorSelect;
