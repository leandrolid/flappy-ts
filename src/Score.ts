import { GameElement, GameElementParams } from './GameElement';
import { PipesPosition } from './PipePair';

export class Score extends GameElement {
  private points: number;
  
  constructor(elementInfo: GameElementParams) {
    super(elementInfo);
    this.destX = elementInfo.context.canvas.width - 10;
    this.destY = 40;
    this.points = 0;
  }

  public drawImage(): void {}

  private setPoints(pipesPositions: PipesPosition[][]) {
    if (Array.isArray(pipesPositions) && pipesPositions.length > 1) {
      const flappyTail = 145;
      const pipeWidth = 52;
      const [[firstPipe], [secondPipe]] = pipesPositions;
      const firstPipeEnd = firstPipe.pipeX + 52;
      const firstPipeStart = firstPipe.pipeX;
      const secondPipeEnd = secondPipe.pipeX + 52;
      const secondPipeStart = secondPipe.pipeX;

      if (firstPipeEnd <= flappyTail && firstPipeStart >= flappyTail - pipeWidth) {
        this.points += 1;
      }
      
      if (secondPipeEnd <= flappyTail && secondPipeStart >= flappyTail - pipeWidth) {
        this.points += 1;
      }
    }
  }

  public action({ pipesPositions }: { pipesPositions: PipesPosition[][] }): void {
    this.elementInfo.context.font = '25px "Press Start 2P"';
    this.elementInfo.context.textAlign = 'right';
    this.elementInfo.context.fillStyle = '#ffffff';
    this.elementInfo.context.fillText(`${this.points}`, this.destX, this.destY);

    this.setPoints(pipesPositions);
  }
}