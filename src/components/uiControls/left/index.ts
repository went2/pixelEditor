import { EditorState, UIComponent, EditorConfig } from "@/types";
import ToolButton from "./ToolButton";
import ColorSelect from "./ColorSelect";
import elt from "@/utils/createElement";

class ToolBar implements UIComponent {
  public dom: HTMLElement;

  constructor(state: EditorState, config: EditorConfig) {
    const tools = config.tools;
    this.dom = elt(
      "div",
      {
        className: "toolbar",
      },
      ...Object.keys(tools).map(
        (name) => new ToolButton(state, config, name).dom
      ),
      new ColorSelect(state, config).dom
    );
  }

  public syncState(state: EditorState): void {}
}

export default ToolBar;
