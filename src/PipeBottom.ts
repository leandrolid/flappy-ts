import { GameElement, GameElementParams } from './GameElement';

export class PipeBottom extends GameElement {
  constructor(elementInfo: GameElementParams) {
    super(elementInfo);
    this.sourceX = 0;
    this.sourceY = 169;
    this.sourceWidth = 52;
    this.sourceHeight = 400;
    this.destX = 0;
    this.destY = 0;
    this.destWidth = this.sourceWidth;
    this.destHeight = this.sourceHeight;
  }
}