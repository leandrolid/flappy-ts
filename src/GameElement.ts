export interface GameElementParams {
  context: CanvasRenderingContext2D;
  source: CanvasImageSource;
}

export interface DrawImageParams {
  sourceX?: number;
  sourceY?: number;
  sourceWidth?: number;
  sourceHeight?: number;
  destX?: number;
  destY?: number;
  destWidth?: number;
  destHeight?: number;
}

export class GameElement {
  sourceX: number;
  sourceY: number;
  sourceWidth: number;
  sourceHeight: number;
  destX: number;
  destY: number;
  destWidth: number;
  destHeight: number;

  constructor(public elementInfo: GameElementParams) {
    this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = 0;
    this.sourceHeight = 0;
    this.destX = 0;
    this.destY = 0;
    this.destWidth = 0;
    this.destHeight = 0;
  }
  
  public drawImage(params?: DrawImageParams): void {
    this.elementInfo.context.drawImage(
      this.elementInfo.source!,
      params?.sourceX || this.sourceX,
      params?.sourceY || this.sourceY,
      params?.sourceWidth || this.sourceWidth,
      params?.sourceHeight || this.sourceHeight,
      params?.destX || this.destX,
      params?.destY || this.destY,
      params?.destWidth || this.destWidth,
      params?.destHeight || this.destHeight,
    )

  }

  public action(..._args: any): void {}
}
