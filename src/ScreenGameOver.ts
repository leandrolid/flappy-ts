import { ClickPosition } from './Game';
import { DrawImageParams, GameElement, GameElementParams } from './GameElement';

export class ScreenGameOver extends GameElement {
  private points: { current: number; best: number }

  constructor(elementInfo: GameElementParams) {
    super(elementInfo);
    this.sourceX = 133;
    this.sourceY = 152;
    this.sourceWidth = 228;
    this.sourceHeight = 202;
    this.destX = elementInfo.context.canvas.width / 2 - this.sourceWidth / 2;
    this.destY = 100;
    this.destWidth = this.sourceWidth;
    this.destHeight = this.sourceHeight;
    this.points = { current: 0, best: 0 };
  }

  public verifyClickOnButton({ clickX, clickY }: ClickPosition) { // 
    const button = {
      x: this.destX + 73,
      y: this.destY + this.destHeight - 29,
      width: 82,
      height: 28,
    }
    if(clickX >= button.x && clickX <= button.x + button.width && clickY >= button.y && clickY <= button.y + button.height){
      return true;
    }

    return false;
  }

  private drawPoints(points: number, destY: number) {
    this.elementInfo.context.font = '15px "Press Start 2P"';
    this.elementInfo.context.textAlign = 'right';
    this.elementInfo.context.fillStyle = '#533847';
    this.elementInfo.context.fillText(`${points}`, this.destX + this.destWidth - 22, destY);
  }

  private drawCoins(sourceX: number, sourceY: number) {
    this.elementInfo.context.drawImage(this.elementInfo.source, sourceX, sourceY, 44, 44, this.destX + 29, this.destY + 90, 40, 40)
  }

  private setPoints() {
    const points = localStorage.getItem('points');

    if(points) {
      this.points = JSON.parse(points);
    }
  }

  private setCoinForPointsRange() {
    if (this.points.current <= 10) {
      this.drawCoins(0, 78);
    }
    
    if (this.points.current > 10 && this.points.current <= 20) {
      this.drawCoins(48, 78);
    }

    if (this.points.current > 20 && this.points.current <= 30) {
      this.drawCoins(0, 124);
    }

    if (this.points.current > 30) {
      this.drawCoins(48, 124);
    }
  }

  public drawImage(params?: DrawImageParams): void {
      super.drawImage(params);
      this.setPoints();
      this.setCoinForPointsRange();

      this.drawPoints(this.points.current, this.destY + 95);
      this.drawPoints(this.points.best, this.destY + 135);
  }
}