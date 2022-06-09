import { Inputs } from './Inputs';
import { Elements } from './main';

export type GameScreen = 'ready' | 'playing' | 'gameOver'


export type Action = 'click' | 'collision'
export class Game {
  private gameScreen: GameScreen = 'ready'
  private frames: number;
  private gameScreen: GameScreen;
  private isTapping: boolean;

  constructor(
    private context: CanvasRenderingContext2D,
    private elements: Elements,
    ) {
    this.frames = 0;
    this.gameScreen = 'ready';
    this.isTapping = false;
  }

  private clearScreen() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
  }

  private setGameState(action: Action) {
    if (action === 'collision') {
      this.gameScreen = 'gameOver';
    }

    if (action === 'click' && this.gameScreen !== 'playing') {
      this.gameScreen = 'playing';
      this.registerElements();
    }
  }

  private registerFrames() {
    this.frames += 1
    if (this.frames === 300) this.frames = 0
  }

  private setIsTapping(timer: number | undefined) {
    this.isTapping = true;
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => this.isTapping = false, 150);
  }

  registerInputs() {
    const inputs = new Inputs()
    inputs.onPlayerTap(this.setIsClicked.bind(this))
    inputs.onPlayerStart(this.setGameState.bind(this))
  }

  public initialize() {
    this.clearScreen();

    const { screenReady, screenGameOver, ...elements } = this.elements;

    for (const element of Object.values(elements)) {
      element.drawImage();

      if (this.gameScreen === 'playing') {
        element.action({
          isTapping: this.isTapping,
          frames: this.frames,
          pipesPositions: elements.pipePair.getPositions(),
          onFlappyCollision: this.setGameState.bind(this)
        });
      }
    }

    if (this.gameScreen === 'gameOver') screenGameOver.drawImage()
    if (this.gameScreen === 'ready') screenReady.drawImage()

    this.registerFrames();
    requestAnimationFrame(() => this.initialize())
  }
}
