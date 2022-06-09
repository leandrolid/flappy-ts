import { Game } from './Game';
import { GameElement } from './GameElement';
import { Flappy } from './Flappy';
import { Sprites } from './Sprites';
import { Floor } from './Floor';
import { Canvas } from './Canvas';
import { Background } from './Background';
import { PipeBottom } from './PipeBottom';
import { PipeTop } from './PipeTop';
import { PipePair } from './PipePair';
import { ScreenReady } from './ScreenReady';
import { ScreenGameOver } from './ScreenGameOver';

import spritesFile from './assets/sprites.png'

export interface Elements {
  background: GameElement
  pipePair: GameElement
  floor: GameElement
  flappy: GameElement
  screenReady: GameElement
  screenGameOver: GameElement
}
class App {
  private elements: Elements;
  private context: CanvasRenderingContext2D;
  private sprites: HTMLImageElement;

  constructor() {
    this.elements = Object()
    this.context = Canvas.getContext();
    this.sprites = Sprites.getSprites(spritesFile);
  }

  private registerElements() {
    const elementInfo = { source: this.sprites, context: this.context };
    const pipeBottom = new PipeBottom(elementInfo)
    const pipeTop = new PipeTop(elementInfo)

    this.elements = {
      background: new Background(elementInfo),
      pipePair: new PipePair(elementInfo, pipeTop, pipeBottom),
      floor: new Floor(elementInfo),
      flappy: new Flappy(elementInfo),
      screenReady: new ScreenReady(elementInfo),
      screenGameOver: new ScreenGameOver(elementInfo),
    }
  }

  private registerGame() {
    const game = new Game(this.context, this.elements)
    game.registerInputs();
    game.initialize()
  }

  main() {
    this.registerElements()
    this.registerGame()
  }
}

new App().main();
