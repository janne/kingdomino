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

class Domino extends PIXI.Sprite {
  constructor(renderer, xMargin, yMargin) {
    const graphics = new Background('Field', 'Grassland')
    const texture = renderer.generateTexture(graphics)
    super(texture)

    this.interactive = true
    this.buttonMode = true
    this.anchor.set(0.5)

    this.xMargin = xMargin
    this.yMargin = yMargin

    var textLeft = new PIXI.Text('F')
    textLeft.x = -25
    textLeft.anchor.set(0.5)
    this.addChild(textLeft)

    var textRight = new PIXI.Text('G')
    textRight.x = 25
    textRight.anchor.set(0.5)
    this.addChild(textRight)

    this.on('mousedown', this.mouseDown)
      .on('mouseup', this.mouseUp)
      .on('mouseupoutside', this.mouseUp)
      .on('mousemove', this.mouseMove)
  }

  mouseDown(event) {
    this.data = event.data
    this.alpha = 0.5
    this.dragging = true
    this.previousX = this.x
    this.previousY = this.y
  }

  mouseMove(event) {
    if (this.dragging) {
      var newPosition = this.data.getLocalPosition(this.parent)
      this.x = newPosition.x
      this.y = newPosition.y
    }
  }

  mouseUp() {
    this.alpha = 1
    this.dragging = false
    this.data = null

    if (this.previousX === this.x && this.previousY === this.y) {
      this.rotate()
    }
    const h = this.isHorizontal()

    const xPos = Math.floor((this.x - this.xMargin - (h ? 25 : 0)) / 50)
    const yPos = Math.floor((this.y - this.yMargin - (h ? 0 : 25)) / 50)
    if (xPos >= 0 && yPos >= 0 && xPos < 9 && yPos < 9) {
      this.x = xPos * 50 + 25 + (h ? 25 : 0) + this.xMargin
      this.y = yPos * 50 + 25 + (h ? 0 : 25) + this.yMargin
    } else {
      this.x = this.previousX
      this.y = this.previousY
    }
  }

  isHorizontal() {
    return this.rotation === 0 || this.rotation === Math.PI
  }

  rotate() {
    this.rotation += Math.PI / 2
    if (this.rotation === Math.PI * 2) {
      this.rotation = 0
    }
  }
}

export default Domino
