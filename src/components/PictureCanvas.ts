import elt from "../utils/createElement";
import { Position } from "../types";
import Picture from "../models/picture";
import { drawPicture } from "../utils/drawHelpers";

// A canvas component that only knows current picture
class PictureCanvas {
  public dom: HTMLElement;
  public canvas: HTMLCanvasElement;
  private background: HTMLCanvasElement;
  public picture: Picture;
  private WIDTH = 384;
  private HEIGHT = 384;
  private currentSize;

  constructor(
    picture: Picture,
    pointerDown: (pos: Position) => void,
    currentSize: number
  ) {
    this.currentSize = currentSize;
    this.picture = picture;

    this.background = elt("canvas", {
      width: this.WIDTH,
      height: this.HEIGHT,
      className: "canvas",
    }) as HTMLCanvasElement;

    this.drawGrid(0, 0, this.WIDTH, this.HEIGHT, this.WIDTH / currentSize);
    this.canvas = elt("canvas", {
      onmousedown: (event: MouseEvent) => this.mouse(event, pointerDown),
      ontouchstart: (event: TouchEvent) => this.touch(event, pointerDown),
      width: this.WIDTH,
      height: this.HEIGHT,
      className: "canvas",
    }) as HTMLCanvasElement;

    this.dom = elt(
      "div",
      {
        id: "canvas-container",
      },
      this.background,
      this.canvas
    );

    this.syncState(picture, currentSize);
  }

  public mouse(downEvent: MouseEvent, onDown: (...args: any[]) => any) {
    if (downEvent.button != 0) return;
    let pos = this.pointerPosition(downEvent, this.canvas);
    let onMove = onDown(pos);
    if (!onMove) return;
    let move = (moveEvent: MouseEvent) => {
      if (moveEvent.buttons == 0) {
        this.canvas.removeEventListener("mousemove", move);
      } else {
        let newPos = this.pointerPosition(moveEvent, this.canvas);
        if (newPos.x == pos.x && newPos.y == pos.y) return;
        pos = newPos;
        onMove(newPos);
      }
    };
    this.canvas.addEventListener("mousemove", move);
  }

  public touch(startEvent: TouchEvent, onDown: (...args: any[]) => any) {
    let pos = this.pointerPosition(startEvent.changedTouches[0], this.canvas);
    let onMove = onDown(pos);
    startEvent.preventDefault();
    if (!onMove) return;
    let move = (moveEvent: TouchEvent) => {
      let newPos = this.pointerPosition(
        moveEvent.changedTouches[0],
        this.canvas
      );
      if (newPos.x == pos.x && newPos.y == pos.y) return;
      pos = newPos;
      onMove(newPos);
    };
    let end = () => {
      this.canvas.removeEventListener("touchmove", move);
      this.canvas.removeEventListener("touchend", end);
    };
    this.canvas.addEventListener("touchmove", move);
    this.canvas.addEventListener("touchend", end);
  }

  public get scale() {
    return this.WIDTH / this.currentSize;
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

  private drawGrid(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    gridCellSize: number
  ) {
    const ctx = <CanvasRenderingContext2D>this.background.getContext("2d");
    ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    ctx.beginPath();
    ctx.lineWidth = 0.1;
    for (let x = startX; x <= endX; x += gridCellSize) {
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
    }

    for (let y = startY; y <= endY; y += gridCellSize) {
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
    }

    ctx.strokeStyle = "#231816";
    ctx.stroke();
    ctx.closePath();
  }

  public syncState(picture: Picture, currentSize: number) {
    // generate a new picture for new size
    if (this.currentSize != currentSize) {
      this.currentSize = currentSize;
      this.picture = picture;
      this.drawGrid(0, 0, this.WIDTH, this.HEIGHT, this.WIDTH / currentSize);
      drawPicture(this.picture, this.canvas, this.scale);
      return;
    }
    if (this.picture === picture) {
      return;
    }

    // It is picture update
    this.picture = picture;
    drawPicture(this.picture, this.canvas, this.scale);
  }
}

export default PictureCanvas;
