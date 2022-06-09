import { GameScreen } from './Game';
import { GameElement, GameElementParams } from './GameElement';
import { PipesPosition } from './PipePair';

interface ActionParams {
  isClicked: boolean;
  pipesPositions: PipesPosition[][];
  onFlappyCollision: (state: GameScreen) => void;
}

type OnFlappyCollision = (state: GameScreen) => void

export class Flappy extends GameElement {
  private speed: number;
  private gravity: number;
  private jump: number;

  constructor(elementInfo: GameElementParams) {
    super(elementInfo)
    this.speed = 0;
    this.gravity = 0.25;
    this.jump = -4.6;
    this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = 34;
    this.sourceHeight = 25;
    this.destX = 145;
    this.destY = 104;
    this.destWidth = 33;
    this.destHeight = 24;
  }

  private verifyHitFloor(onFlappyCollision: OnFlappyCollision) {
    const flappyBottom = this.destY + this.destHeight
    const startFloor = this.elementInfo.context.canvas.height - 112
    const isOverlap = flappyBottom >= startFloor;

    if (isOverlap) {
      this.speed = 0;
      this.destY = this.destY
      onFlappyCollision('gameOver')
    }
  }

  private verifyHitPipes(pipesPositions: PipesPosition[][], onFlappyCollision: OnFlappyCollision) {
    if (pipesPositions.length) {
      pipesPositions.forEach(([ pipeTop, pipeBottom ]) => {
        const isLeftWidthOverlaping = this.destX + this.destWidth >= pipeTop.pipeX || this.destX >= pipeTop.pipeX
        const isRightWidthOverlaping = this.destX + this.destWidth <= pipeTop.pipeX + 52 || this.destX <= pipeTop.pipeX
        const isPipeTopHeightOverlaping = this.destY <= pipeTop.pipeY
        const isPipeBottomHeightOverlaping = this.destY + this.destHeight >= pipeBottom.pipeY

        if (isLeftWidthOverlaping && isRightWidthOverlaping && isPipeTopHeightOverlaping) {
          onFlappyCollision('gameOver');
        }

        if (isLeftWidthOverlaping && isRightWidthOverlaping && isPipeBottomHeightOverlaping) {
          onFlappyCollision('gameOver');
        }
      })
    }
  }

  private animateSprites() {
    if(this.speed < 0) {
      this.sourceY = 52
    } else if (this.speed > -2 && this.speed < 2) {
      this.sourceY = 26
    } else {
      this.sourceY = 0
    }
  }

  public action({ isClicked, pipesPositions, onFlappyCollision }: ActionParams): void {
    this.verifyHitFloor(onFlappyCollision)

    if (isClicked) {
      this.speed = this.jump
    } else {
      this.speed += this.gravity;
      this.destY += this.speed
    }
    this.animateSprites()
    this.verifyHitPipes(pipesPositions, onFlappyCollision)
  }
}