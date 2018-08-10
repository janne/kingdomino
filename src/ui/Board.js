import * as PIXI from 'pixi.js'

class Board extends PIXI.Graphics {
  constructor() {
    super()
    this.lineStyle(1, 0xe0e0e0, 1)

    for (let y = 0; y < 10; y++) {
      this.moveTo(0, y * 50)
      this.lineTo(450, y * 50)
      for (let x = 0; x < 10; x++) {
        this.moveTo(x * 50, 0)
        this.lineTo(x * 50, 450 + 0)
      }
    }

    this.lineStyle(1, 0, 1)
    this.beginFill(0x88ee88)
    this.drawRect(200, 200, 50, 50)
    this.endFill()
  }
}

export default Board
