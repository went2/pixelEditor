import { EditorState, UIComponent, EditorConfig } from "@/types";
import ToolButton from "./ToolButton";
import ColorSelect from "./ColorSelect";
import elt from "@/utils/createElement";

class ToolBar implements UIComponent {
  public dom: HTMLElement;
  private controls: UIComponent[];

  constructor(state: EditorState, config: EditorConfig) {
    const tools = config.tools;
    this.controls = Object.keys(tools).map(
      (name) => new ToolButton(state, config, name)
    );
    this.controls.push(new ColorSelect(state, config));

    this.dom = elt(
      "div",
      {
        className: "left-controls",
      },
      ...this.controls.map((control) => control.dom)
    );
  }

  public syncState(state: EditorState): void {
    for (let ctrl of this.controls) {
      ctrl.syncState(state);
    }
  }
}

export default ToolBar;
