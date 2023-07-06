import elt from "../utils/createElement";
import { EditorConfig, UIComponent } from "../types";
import { startLoad } from "../utils/fileLoader";

class LoadButton implements UIComponent {
  public dom: HTMLElement;
  constructor(_: any, { dispatch }: EditorConfig) {
    this.dom = elt(
      "button",
      {
        onclick: () => startLoad(dispatch),
      },
      "📁 Load"
    );
  }
  syncState() {}
}

export default LoadButton;
