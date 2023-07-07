import { EditorConfig, EditorState, UIComponent } from "@/types";
import SetSizeButton from "./SetSizeButton";
import elt from "@/utils/createElement";

// initial different sizes of buttons and export
export default class SetSizeButtons implements UIComponent {
  private sizes = [16, 32, 64, 128];
  public dom: HTMLElement;
  private controls: UIComponent[];

  constructor(state: EditorState, config: EditorConfig) {
    this.controls = this.sizes.map(
      (size) => new SetSizeButton(state, config, size)
    );

    this.dom = elt(
      "div",
      {
        className: "top-btns-container",
      },
      ...this.controls.map((btn) => btn.dom)
    );
  }

  public syncState(state: EditorState): void {
    for (let ctrl of this.controls) {
      ctrl.syncState(state);
    }
  }
}
