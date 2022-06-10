import { Game } from './Game';
import { Canvas } from './Canvas';

class App {
  private context: CanvasRenderingContext2D;

  constructor() {
    this.context = Canvas.getContext();
  }

  private registerGame() {
    const game = new Game(this.context);
    game.setNewGameElements();
    game.registerInputs();
    game.initialize()
  }

  public start() {
    this.registerGame()
  }
}

window.onload = () => {
  const app = new App();
  app.start();
};
