import Picture, { Pixel } from "../models/picture";
import { ActionObj, EditorState, Position } from "../types";
import elt from "./createElement";

export function drawPicture(
  picture: Picture,
  canvas: HTMLCanvasElement,
  scale: number
) {
  let cx = <CanvasRenderingContext2D>canvas.getContext("2d");
  cx.clearRect(0, 0, picture.height * scale, picture.height * scale);

  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      cx.fillStyle = picture.getPixel(x, y);
      cx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
}

export function pictureFromImage(image: HTMLImageElement): Picture {
  let width = Math.min(100, image.width);
  let height = Math.min(100, image.height);
  let canvas = <HTMLCanvasElement>elt("canvas", { width, height });
  let cx = canvas.getContext("2d");
  cx!.drawImage(image, 0, 0);
  let pixels = [];
  let { data } = cx!.getImageData(0, 0, width, height);

  function hex(n: number) {
    return n.toString(16).padStart(2, "0");
  }
  for (let i = 0; i < data.length; i += 4) {
    let [r, g, b] = data.slice(i, i + 3);
    pixels.push("#" + hex(r) + hex(g) + hex(b));
  }
  return new Picture(width, height, pixels);
}

export function draw(
  pos: Position,
  state: EditorState,
  dispatch: (action: ActionObj) => void
): (...args: any[]) => void {
  function drawPixel({ x, y }: Position, state: EditorState) {
    const drawn = { x, y, color: state.color };
    dispatch({
      type: "draw",
      payload: {
        picture: state.picture.draw([drawn]),
      },
    });
  }
  drawPixel(pos, state);
  return drawPixel;
}

// fill
const around = [
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
];

export function fill(
  { x, y }: Position,
  state: EditorState,
  dispatch: (...args: any[]) => void
) {
  let targetColor = state.picture.getPixel(x, y);
  let drawn = [{ x, y, color: state.color }];
  for (let done = 0; done < drawn.length; done++) {
    for (let { dx, dy } of around) {
      let x = drawn[done].x + dx,
        y = drawn[done].y + dy;
      if (
        x >= 0 &&
        x < state.picture.width &&
        y >= 0 &&
        y < state.picture.height &&
        state.picture.getPixel(x, y) == targetColor &&
        !drawn.some((p) => p.x == x && p.y == y)
      ) {
        drawn.push({ x, y, color: state.color });
      }
    }
  }
  dispatch({ picture: state.picture.draw(drawn) });
}

export function pick(
  pos: Position,
  state: EditorState,
  dispatch: (...args: any[]) => void
) {
  dispatch({ color: state.picture.getPixel(pos.x, pos.y) });
}

export function rectangle(
  start: Position,
  state: EditorState,
  dispatch: (...args: any[]) => void
) {
  function drawRectangle(pos: Position) {
    let xStart = Math.min(start.x, pos.x);
    let yStart = Math.min(start.y, pos.y);
    let xEnd = Math.max(start.x, pos.x);
    let yEnd = Math.max(start.y, pos.y);
    let drawn: Pixel[] = [];
    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        drawn.push({ x, y, color: state.color });
      }
    }
    dispatch({ picture: state.picture.draw(drawn) });
  }
  drawRectangle(start);
  return drawRectangle;
}
