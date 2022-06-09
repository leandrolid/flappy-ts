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

import spritesFile from './assets/sprites.png'
import { ScreenReady } from './ScreenReady';
import { ScreenGameOver } from './ScreenGameOver';

class App {
  private elements: GameElement[];
  private context: CanvasRenderingContext2D;
  private sprites: HTMLImageElement;

  constructor() {
    this.elements = []
    this.context = Canvas.getContext();
    this.sprites = Sprites.getSprites(spritesFile);
  }

  private registerElements() {
    const elementInfo = { source: this.sprites, context: this.context };

    const background = new Background(elementInfo);
    const pipeBottom = new PipeBottom(elementInfo);
    const pipeTop = new PipeTop(elementInfo);
    const pipePair = new PipePair(elementInfo, pipeTop, pipeBottom)
    const floor = new Floor(elementInfo);
    const flappy = new Flappy(elementInfo);
    const screenReady = new ScreenReady(elementInfo);
    const screenGameOver = new ScreenGameOver(elementInfo);

    this.elements.push(background, pipePair, floor, flappy, screenReady, screenGameOver)
  }

  private registerGame() {
    const pipePair = this.elements.find((element) => element?.getPositions())!
    const game = new Game(this.context, this.elements, pipePair)
    game.registerInputs();
    game.initialize()
  }

  main() {
    this.registerElements()
    this.registerGame()
  }
}

new App().main();
