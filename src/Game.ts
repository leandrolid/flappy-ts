import { Inputs } from './Inputs';
import { Flappy } from './Flappy';
import { Floor } from './Floor';
import { Background } from './Background';
import { PipeBottom } from './PipeBottom';
import { PipeTop } from './PipeTop';
import { PipePair } from './PipePair';
import { ScreenReady } from './ScreenReady';
import { ScreenGameOver } from './ScreenGameOver';
import { Sprites } from './Sprites';
import spritesFile from './assets/sprites.png'
import { Score } from './Score';

export type GameScreen = 'ready' | 'playing' | 'gameOver';
export type Action = 'click' | 'collision';
export type ClickPosition = { clickX: number, clickY: number };

export interface Elements {
  background: Background;
  pipePair: PipePair;
  floor: Floor;
  flappy: Flappy;
  score: Score;
  screenReady: ScreenReady;
  screenGameOver: ScreenGameOver;
}

export class Game {
  private elements: Elements;
  private frames: number;
  private gameScreen: GameScreen;
  private isTapping: boolean;

  constructor(private context: CanvasRenderingContext2D) {
    this.elements = Object()
    this.frames = 0;
    this.gameScreen = 'ready';
    this.isTapping = false;
  }

  private clearScreen() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
  }

  public setNewGameElements() {
    const elementInfo = { source: Sprites.getSprites(spritesFile), context: this.context };
    const pipeBottom = new PipeBottom(elementInfo)
    const pipeTop = new PipeTop(elementInfo)

    this.elements = {
      background: new Background(elementInfo),
      pipePair: new PipePair(elementInfo, pipeTop, pipeBottom),
      floor: new Floor(elementInfo),
      flappy: new Flappy(elementInfo),
      score: new Score(elementInfo),
      screenReady: new ScreenReady(elementInfo),
      screenGameOver: new ScreenGameOver(elementInfo),
    }
  }

  private setActionOccurrence(action: Action, clickPosition: ClickPosition) {
    if (action === 'collision') {
      this.gameScreen = 'gameOver';
    }

    if (action === 'click' && this.gameScreen === 'ready') {
      this.gameScreen = 'playing';
    }

    if (action === 'click' && this.gameScreen === 'gameOver') {
      if (this.elements.screenGameOver.verifyClickOnButton(clickPosition)) {
        this.gameScreen = 'playing';
        this.setNewGameElements();
      }
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

  public registerInputs() {
    const inputs = new Inputs()
    inputs.onPlayerTap(this.setIsTapping.bind(this))
    inputs.onPlayerStart(this.setActionOccurrence.bind(this))
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
          onFlappyCollision: this.setActionOccurrence.bind(this)
        });
      }
    }

    if (this.gameScreen === 'gameOver') screenGameOver.drawImage({ frames: this.frames })
    if (this.gameScreen === 'ready') screenReady.drawImage()

    this.registerFrames();
    requestAnimationFrame(() => this.initialize())
  }
}
