import { DrawImageParams, GameElement, GameElementParams } from './GameElement';

export class ScreenGameOver extends GameElement {
  constructor(elementInfo: GameElementParams) {
    super(elementInfo);
    this.sourceX = 133;
    this.sourceY = 152;
    this.sourceWidth = 228;
    this.sourceHeight = 202;
    this.destX = elementInfo.context.canvas.width / 2 - this.sourceWidth / 2;
    this.destY = 100;
    this.destWidth = this.sourceWidth;
    this.destHeight = this.sourceHeight;
  }

  private drawPoints(points: number, destY: number) {
    this.elementInfo.context.font = '15px "Press Start 2P"';
    this.elementInfo.context.textAlign = 'right';
    this.elementInfo.context.fillStyle = '#533847';
    this.elementInfo.context.fillText(`${points}`, this.destX + this.destWidth - 22, destY);
  }

  public drawImage(params?: DrawImageParams): void {
      super.drawImage(params);

      const points = JSON.parse(localStorage.getItem('points')!);
      this.drawPoints(points.current, this.destY + 95);
      this.drawPoints(points.best, this.destY + 135);
  }
}