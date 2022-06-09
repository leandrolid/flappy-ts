import { GameElement, GameElementParams } from './GameElement';

export class Background extends GameElement {
  constructor(elementInfo: GameElementParams) {
    super(elementInfo);
    this.sourceX = 390;
    this.sourceY = 0;
    this.sourceWidth = 275;
    this.sourceHeight = 204;
    this.destX = 0;
    this.destY = this.elementInfo.context.canvas.height - 204;
    this.destWidth = this.sourceWidth;
    this.destHeight = this.sourceHeight;
  }

  public drawImage(): void {
    this.elementInfo.context.fillStyle = '#70c5ce';
    this.elementInfo.context.fillRect(0,0, this.elementInfo.context.canvas.width, this.elementInfo.context.canvas.height)
    super.drawImage()
    super.drawImage({ destX: this.destX + this.destWidth - 1 })
  }

  public action(): void {
    const speed = 0.1;
    const halfWidth = this.destWidth / 2;

    const movement = this.destX - speed;
    const repeatPoint = movement % halfWidth;

    this.destX = repeatPoint;
  }
}