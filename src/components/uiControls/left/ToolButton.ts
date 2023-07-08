import { EditorState, UIComponent, EditorConfig } from "@/types";
import elt from "@/utils/createElement";

class ToolButton implements UIComponent {
  public dom: HTMLButtonElement;
  private name: string;

  constructor(state: EditorState, { dispatch }: EditorConfig, name: string) {
    this.name = name;
    this.dom = elt(
      "button",
      {
        onclick: () =>
          dispatch({
            type: "select-tool",
            payload: { tool: this.dom.textContent! },
          }),
        className: this.name === state.currentTool ? "selected" : "",
      },
      name
    ) as HTMLButtonElement;
  }
  public syncState() {}
}

export default ToolButton;
