import { GameElement } from './GameElement';
import { Inputs } from './Inputs';

export type GameScreen = 'ready' | 'playing' | 'gameOver'

export class Game {
  private gameScreen: GameScreen = 'ready'
  private frames: number;
  private isClicked: boolean;

  constructor(
    private context: CanvasRenderingContext2D,
    private elements: GameElement[],
    private pipePair: GameElement
    ) {
    this.frames = 0;
    this.isClicked = false
  }

  private clearScreen() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
  }

  private setGameState(state: GameScreen) {
    this.gameScreen = state;
  }

  private registerFrames() {
    this.frames += 1
    if (this.frames === 300) this.frames = 0
  }

  private setIsClicked(timer: number | undefined) {
    this.isClicked = true;
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => this.isClicked = false, 150);
  }

  registerInputs() {
    const inputs = new Inputs()
    inputs.onPlayerTap(this.setIsClicked.bind(this))
    inputs.onPlayerStart(this.setGameState.bind(this))
  }

  public initialize() {
    this.clearScreen();

    const elements = [...this.elements];

    const screenGameOver = elements.pop();
    const screenReady = elements.pop();

    elements.forEach((element) => {
      element.drawImage();

      if (this.gameScreen === 'playing') {
        element.action({
          isClicked: this.isClicked,
          frames: this.frames,
          pipesPositions: this.pipePair.getPositions(),
          onFlappyCollision: this.setGameState.bind(this)
        });
      }
    });

    if (this.gameScreen === 'gameOver') screenGameOver?.drawImage()
    if (this.gameScreen === 'ready') screenReady?.drawImage()

    this.registerFrames();
    requestAnimationFrame(() => this.initialize())
  }
}
