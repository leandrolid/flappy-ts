import { GameElement, GameElementParams } from './GameElement';
import { PipeBottom } from './PipeBottom';
import { PipeTop } from './PipeTop';

interface Position { x: number; y: number; }
export interface PipesPosition { name: string; pipeX: number; pipeY: number; }

export class PipePair extends GameElement {
  private positions: Position[];
  private spacing: number;
  private pipes: PipesPosition[][];

  constructor(elementInfo: GameElementParams, private pipeTop: PipeTop, private pipeBottom: PipeBottom) {
    super(elementInfo);

    this.positions = []
    this.spacing = 90
    this.pipes = []
  }

  public drawImage(): void {
    this.positions.forEach(({ x, y }) => {
      const pipeTopPosition = { destX: x, destY: y }
      const pipeBottomPosition = { destX: x, destY: this.pipeBottom.destHeight + this.spacing + y }

      this.pipeTop.drawImage(pipeTopPosition);
      this.pipeBottom.drawImage(pipeBottomPosition);
    })
  }

  private addNewPosition(frames: number) {
    const rangeY = [-150, -175];
    const isOneCiclePassed = frames % 150 === 0;

    if (isOneCiclePassed) {
      this.positions.push({
        x: this.elementInfo.context.canvas.width,
        y: rangeY[Math.round(Math.random())] * (Math.random() + 1),
      })
    }
  }

  private removeOldPosition() {
    this.positions = this.positions.filter(({ x }) => x > -52)
  }

  private setPipesPosition() {
    if (this.positions.length) {
      const pipes = this.positions.map((position) => ([
          { name: 'top', pipeX: position.x, pipeY: this.pipeTop.destHeight + position.y },
          { name: 'bottom', pipeX: position.x, pipeY: this.pipeBottom.destHeight + this.spacing + position.y },
      ]))

      this.pipes = pipes;
    }
  }

  public action({ frames }: { frames: number }): void {
    this.addNewPosition(frames);
    this.setPipesPosition();
    
    const speed = 1;
    this.positions = this.positions.map(({ x, y }) => ({
      x: x - speed,
      y,
    }))

    this.removeOldPosition();
    this.setPipesPosition();
  }

  public getPositions() {
    return this.pipes;
  }
}