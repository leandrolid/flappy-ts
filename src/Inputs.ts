import { GameScreen } from './Game';

export class Inputs {
  public onPlayerTap(setIsClicked: (timer: number | undefined) => void ) {
    let timer: number | undefined;

    window.addEventListener('mouseup', () => setIsClicked(timer));
    window.addEventListener('keyup', () => setIsClicked(timer));
  }

  public onPlayerStart(setGameState: (state: GameScreen) => void) {
    window.addEventListener('click', () => setGameState('playing'))
    window.addEventListener('keypress', () => setGameState('playing'))
  }
}