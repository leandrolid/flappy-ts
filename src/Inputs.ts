import { Canvas } from './Canvas';
import { Action, ClickPosition } from './Game';

export class Inputs {
  public onPlayerTap(setIsTapping: (timer: number | undefined) => void ) {
    let timer: number | undefined;

    window.addEventListener('keydown', () => setIsTapping(timer));
    window.addEventListener('mousedown', () => setIsTapping(timer));
  }

  public onPlayerStart(setActionOccurrence: (state: Action, clickPosition: ClickPosition) => void) {
    const canvas = Canvas.getCanvas();
    canvas.addEventListener('click', ({ clientX: clickX, clientY: clickY }) => {
      setActionOccurrence('click', { clickX, clickY })
    })
    canvas.addEventListener('touchstart', ({ touches }) => {
      const { clientX: clickX, clientY: clickY } = touches[0];
      setActionOccurrence('click', { clickX, clickY })
    })
  }
}