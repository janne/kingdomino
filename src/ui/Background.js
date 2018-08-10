import * as PIXI from 'pixi.js'

class Background extends PIXI.Graphics {
  constructor() {
    super()
    this.beginFill(0xff22aa)
    this.drawRect(0, 0, 50, 50)
    this.endFill()
    this.beginFill(0x22ffaa)
    this.drawRect(50, 0, 50, 50)
    this.endFill()
  }
}

export default Background
