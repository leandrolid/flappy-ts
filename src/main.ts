import { Game } from './Game';
import { GameElement } from './GameElement';
import { Canvas } from './Canvas';


export interface Elements {
  background: GameElement
  pipePair: GameElement
  floor: GameElement
  flappy: GameElement
  screenReady: GameElement
  screenGameOver: GameElement
}
class App {
  private context: CanvasRenderingContext2D;

  constructor() {
    
    this.context = Canvas.getContext();
  }

  private registerGame() {
    const game = new Game(this.context);
    game.registerElements();
    game.registerInputs();
    game.initialize()
  }

  main() {
    // this.registerElements()
    this.registerGame()
  }
}

new App().main();
