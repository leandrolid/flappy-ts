import { Action } from './Game';

export class Inputs {
  public onPlayerTap(setIsTapping: (timer: number | undefined) => void ) {
    let timer: number | undefined;

    window.addEventListener('keydown', () => setIsTapping(timer));
    window.addEventListener('mousedown', () => setIsTapping(timer));
  }

  public onPlayerStart(setGameState: (state: Action) => void) {
    window.addEventListener('click', () => setGameState('click'))
    window.addEventListener('keyup', () => setGameState('click'))
  }
}