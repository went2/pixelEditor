import elt from "@/utils/createElement";
import { EditorConfig, EditorState, UIComponent } from "@/types";

class ToolSelect implements UIComponent {
  public select: HTMLSelectElement;
  public dom: HTMLElement;

  constructor(state: EditorState, { tools, dispatch }: EditorConfig) {
    this.select = elt(
      "select",
      {
        onchange: () => dispatch({ tool: this.select.value }),
      },
      ...Object.keys(tools).map((name) =>
        elt(
          "option",
          {
            selected: name == state.tool,
          },
          name
        )
      )
    ) as HTMLSelectElement;
    this.dom = elt("label", null, "🖌 Tool: ", this.select);
  }
  public syncState(state: EditorState) {
    this.select.value = state.tool;
  }
}

export default ToolSelect;
