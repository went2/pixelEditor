import { EditorState, UIComponent, EditorConfig } from "@/types";
import elt from "@/utils/createElement";
import { icons } from "@/assets/IconImges";

class ToolButton implements UIComponent {
  public dom: HTMLImageElement;
  private name: string;

  constructor(state: EditorState, { dispatch }: EditorConfig, name: string) {
    this.name = name;
    this.dom = elt("img", {
      onclick: () =>
        dispatch({
          type: "default",
          payload: { currentTool: this.dom.alt! },
        }),
      src:
        this.name === state.currentTool
          ? icons[name + "-selected"]
          : icons[name],
      alt: name,
      className: this.name === state.currentTool ? "selected" : "",
    }) as HTMLImageElement;
  }
  public syncState(state: EditorState) {
    const isCurrentSelected = this.dom.className.includes("selected");
    if (state.currentTool == this.name) {
      // this tool is selected
      if (isCurrentSelected) {
        return;
      } else {
        this.dom.src = icons[this.name + "-selected"];
        this.dom.className = "selected";
        return;
      }
    } else {
      // other tools selected
      if (isCurrentSelected) {
        this.dom.src = icons[this.name];
        this.dom.className = "";
      }
    }
  }
}

export default ToolButton;
