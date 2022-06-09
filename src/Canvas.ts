export class Canvas {
  private static canvas: HTMLCanvasElement = document.querySelector('canvas')!;

  static getContext() {
    const context = this.canvas.getContext('2d')!;
    return context;
  }

  static getCanvas() {
    return this.canvas;
  }
}