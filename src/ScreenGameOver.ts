import { GameElement, GameElementParams } from './GameElement';

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
}