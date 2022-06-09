export class Sprites {
  static getSprites(src: string): HTMLImageElement {
    const image = new Image();
    image.src = src

    return image
  }
}