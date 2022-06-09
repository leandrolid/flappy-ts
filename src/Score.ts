import { GameElement, GameElementParams } from './GameElement';

export class Score extends GameElement {
  constructor(elementInfo: GameElementParams) {
    super(elementInfo);
    this.destX = elementInfo.context.canvas.width - 10;
    this.destY = 40;
    
  }

  public drawImage(): void {}

  public action({ points }: { points: number}): void {
    this.elementInfo.context.font = '25px "Press Start 2P"';
    this.elementInfo.context.textAlign = 'right';
    this.elementInfo.context.fillStyle = '#ffffff';
    this.elementInfo.context.fillText(`${points}`, this.destX, this.destY);
  }
}