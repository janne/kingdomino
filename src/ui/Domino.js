import * as PIXI from 'pixi.js'

class Domino extends PIXI.Sprite {
  constructor(texture) {
    super(texture)

    this.interactive = true
    this.buttonMode = true
    this.anchor.set(0.5)

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

    const xPos = Math.floor((this.x - (h ? 25 : 0)) / 50)
    const yPos = Math.floor((this.y - (h ? 0 : 25)) / 50)
    if (xPos >= 0 && yPos >= 0 && xPos < 9 && yPos < 9) {
      this.x = xPos * 50 + 25 + (h ? 25 : 0)
      this.y = yPos * 50 + 25 + (h ? 0 : 25)
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
