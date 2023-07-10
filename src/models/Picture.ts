// Model for a frame of canvas
// The width is logical, eg. 16 X 16, not actual width of canvas element, which
// in app is hard-coded 384px
// When export canvas to image, the width should be used as actual width of the exported image.
class Picture {
  public width: number;
  public height: number;
  public pixels: string[]; // array to store colors

  constructor(width: number, height: number, pixels: string[]) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }

  public static empty(width: number, height: number, color?: string) {
    const backgroundColor = color ? color : "#f0f0f000";
    const pixels = new Array(width * height).fill(backgroundColor);
    return new Picture(width, height, pixels);
  }

  public getPixel(x: number, y: number) {
    return this.pixels[x + y * this.width];
  }

  public draw(pixels: Pixel[]) {
    const copy = this.pixels.slice();
    for (const { x, y, color } of pixels) {
      copy[x + y * this.width] = color;
    }
    return new Picture(this.width, this.height, copy);
  }
}

// store coordinates of color
export class Pixel {
  public x: number;
  public y: number;
  public color: string; // like "#000000"
  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

export default Picture;
