// model for a frame of canvas
class Picture {
  public width: number;
  public height: number;
  public pixels: string[]; // array to store colors

  constructor(width: number, height: number, pixels: string[]) {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }
  public static empty(width: number, height: number, color: string) {
    const pixels = new Array(width * height).fill(color);
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
