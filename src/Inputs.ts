import { Canvas } from './Canvas';
import { Action } from './Game';

export class Inputs {
  public onPlayerTap(setIsTapping: (timer: number | undefined) => void ) {
    let timer: number | undefined;

    window.addEventListener('keydown', () => setIsTapping(timer));
    window.addEventListener('mousedown', () => setIsTapping(timer));
  }

  public onPlayerStart(setActionOccurrence: (state: Action) => void) {
    const canvas = Canvas.getCanvas();
    canvas.addEventListener('click', () => setActionOccurrence('click'))
    canvas.addEventListener('keyup', () => setActionOccurrence('click'))
  }
}