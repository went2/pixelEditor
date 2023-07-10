import elt from "@/utils/createElement";
import { EditorState, UIComponent } from "@/types";
import Picture from "@/models/picture";
import { drawPicture } from "@/utils/drawHelpers";

class SaveButton implements UIComponent {
  public picture: Picture;
  public dom: HTMLElement;

  constructor(state: EditorState) {
    this.picture = state.picture;
    this.dom = elt(
      "button",
      {
        onclick: () => this.save(),
      },
      "💾 Save"
    );
  }
  save() {
    let canvas = <HTMLCanvasElement>elt("canvas", {
      width: this.picture.width,
      height: this.picture.height,
    });
    drawPicture(this.picture, canvas, 1);
    let link = elt("a", {
      href: canvas.toDataURL(),
      download: "pixelart.png",
    });
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  syncState(state: EditorState) {
    this.picture = state.picture;
  }
}

export default SaveButton;
