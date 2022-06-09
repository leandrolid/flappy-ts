import { GameElement, GameElementParams } from './GameElement';

export class ScreenReady extends GameElement {
  constructor(elementInfo: GameElementParams) {
    super(elementInfo);
    this.sourceX = 133;
    this.sourceY = 0;
    this.sourceWidth = 176;
    this.sourceHeight = 151;
    this.destX = elementInfo.context.canvas.width / 2 - this.sourceWidth / 2;
    this.destY = 50;
    this.destWidth = this.sourceWidth;
    this.destHeight = this.sourceHeight;
  }
}