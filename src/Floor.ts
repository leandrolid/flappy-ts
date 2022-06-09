import { GameElement, GameElementParams } from './GameElement';

export class Floor extends GameElement {
  constructor(elementInfo: GameElementParams) {
    super(elementInfo);
    this.sourceX = 0;
    this.sourceY = 610;
    this.sourceWidth = 224;
    this.sourceHeight = 112;
    this.destX = 0;
    this.destY = this.elementInfo.context.canvas.height - this.sourceHeight;
    this.destWidth = this.sourceWidth;
    this.destHeight = this.sourceHeight;
  }
  public drawImage(): void {
    super.drawImage()
    super.drawImage({ destX: this.destX + this.destWidth })
  }

  public action(): void {
    const speed = 1;
    const halfWidth = this.destWidth / 2;

    const movement = this.destX - speed;
    const repeatPoint = movement % halfWidth;

    this.destX = repeatPoint;
  }
}