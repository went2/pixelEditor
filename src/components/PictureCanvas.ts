import elt from "../utils/createElement";
import { Position } from "../types";

// A component holds canvas that only knows current picture
// It adds mouse and touch events handlers when constructs
class PictureCanvas {
  public dom: HTMLCanvasElement;
  public picture: Picture;
  private scale: number = 10;

  constructor(
    picture: Picture,
    pointerDown: (...args: any[]) => void,
    scale?: number
  ) {
    this.dom = elt("canvas", {
      onmousedown: (event: MouseEvent) => this.mouse(event, pointerDown),
      ontouchstart: (event: TouchEvent) => this.touch(event, pointerDown),
    }) as HTMLCanvasElement;
    if (scale) this.scale = scale;
    this.syncState(picture);
  }

  public syncState(picture: Picture) {
    if (this.picture == picture) return;
    this.picture = picture;
    drawPicture(this.picture, this.dom, this.scale);
  }

  public mouse(downEvent: MouseEvent, onDown: (...args: any[]) => any) {
    if (downEvent.button != 0) return;
    let pos = this.pointerPosition(downEvent, this.dom);
    let onMove = onDown(pos);
    if (!onMove) return;
    let move = (moveEvent: MouseEvent) => {
      if (moveEvent.buttons == 0) {
        this.dom.removeEventListener("mousemove", move);
      } else {
        let newPos = this.pointerPosition(moveEvent, this.dom);
        if (newPos.x == pos.x && newPos.y == pos.y) return;
        pos = newPos;
        onMove(newPos);
      }
    };
    this.dom.addEventListener("mousemove", move);
  }

  public touch(startEvent: TouchEvent, onDown: (...args: any[]) => any) {
    let pos = this.pointerPosition(startEvent.changedTouches[0], this.dom);
    let onMove = onDown(pos);
    startEvent.preventDefault();
    if (!onMove) return;
    let move = (moveEvent: TouchEvent) => {
      let newPos = this.pointerPosition(moveEvent.changedTouches[0], this.dom);
      if (newPos.x == pos.x && newPos.y == pos.y) return;
      pos = newPos;
      onMove(newPos);
    };
    let end = () => {
      this.dom.removeEventListener("touchmove", move);
      this.dom.removeEventListener("touchend", end);
    };
    this.dom.addEventListener("touchmove", move);
    this.dom.addEventListener("touchend", end);
  }

  private pointerPosition(
    downEvent: MouseEvent | Touch,
    domNode: HTMLCanvasElement
  ): Position {
    let rect = domNode.getBoundingClientRect();
    return {
      x: Math.floor((downEvent.clientX - rect.left) / this.scale),
      y: Math.floor((downEvent.clientY - rect.top) / this.scale),
    };
  }
}

export default PictureCanvas;
