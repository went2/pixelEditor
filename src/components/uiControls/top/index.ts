import { EditorConfig, EditorState, UIComponent } from "@/types";
import SetSizeButton from "./SetSizeButton";
import elt from "@/utils/createElement";

// initial different sizes of buttons and export
export default class SetSizeButtons implements UIComponent {
  private sizes = [16, 32, 64, 128];
  public dom: HTMLElement;

  constructor(state: EditorState, config: EditorConfig) {
    const sizeButtons: UIComponent[] = this.sizes.map(
      (size) => new SetSizeButton(state, config, size)
    );

    this.dom = elt(
      "div",
      {
        className: "top-btns-container",
      },
      ...sizeButtons.map((btn) => btn.dom)
    );
  }

  public syncState() {}
}
