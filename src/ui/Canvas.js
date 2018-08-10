import React, { Component } from 'react'
import './Canvas.css'
import * as PIXI from 'pixi.js'

class Canvas extends Component {
  app: PIXI.Application
  gameCanvas: HTMLDivElement

  drawGraphics(xMargin, yMargin) {
    var graphics = new PIXI.Graphics()
    graphics.lineStyle(1, 0xe0e0e0, 1)

    for (let y = 0; y < 10; y++) {
      graphics.moveTo(xMargin, y * 50 + yMargin)
      graphics.lineTo(450 + xMargin, y * 50 + yMargin)
      for (let x = 0; x < 10; x++) {
        graphics.moveTo(x * 50 + xMargin, yMargin)
        graphics.lineTo(x * 50 + xMargin, 450 + yMargin)
      }
    }

    graphics.lineStyle(1, 0, 1)
    graphics.beginFill(0x88ee88)
    graphics.drawRect(200 + xMargin, 200 + yMargin, 50, 50)
    graphics.endFill()

    return graphics
  }

  makeSprite(renderer, xMargin, yMargin) {
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xff22aa)
    graphics.drawRect(0, 0, 50, 50)
    graphics.endFill()
    graphics.beginFill(0x22ffaa)
    graphics.drawRect(50, 0, 50, 50)
    graphics.endFill()
    const texture = renderer.generateTexture(graphics)
    const sprite = new PIXI.Sprite(texture)
    sprite.interactive = true
    sprite.buttonMode = true

    var textLeft = new PIXI.Text('H')
    textLeft.x = -25
    textLeft.anchor.set(0.5)
    sprite.addChild(textLeft)
    sprite.anchor.set(0.5)

    var textRight = new PIXI.Text('O')
    textRight.x = 25
    textRight.anchor.set(0.5)
    sprite.addChild(textRight)
    sprite.anchor.set(0.5)

    sprite
      .on('mousedown', event => {
        sprite.data = event.data
        sprite.alpha = 0.5
        sprite.dragging = true
        sprite.previousX = sprite.x
        sprite.previousY = sprite.y
      })

      .on('mouseup', () => {
        sprite.alpha = 1
        sprite.dragging = false
        sprite.data = null
        const xPos = Math.floor((sprite.x - xMargin - 25) / 50)
        const yPos = Math.floor((sprite.y - yMargin) / 50)
        if (xPos >= 0 && yPos >= 0 && xPos < 8 && yPos < 9) {
          sprite.x = xPos * 50 + 50 + xMargin
          sprite.y = yPos * 50 + 25 + yMargin
        } else {
          sprite.x = sprite.previousX
          sprite.y = sprite.previousY
        }
      })

      .on('mouseupoutside', () => {
        sprite.alpha = 1
        sprite.dragging = false
        sprite.data = null
      })

      .on('mousemove', event => {
        if (sprite.dragging) {
          var newPosition = sprite.data.getLocalPosition(sprite.parent)
          sprite.x = newPosition.x
          sprite.y = newPosition.y
        }
      })
    return sprite
  }

  componentDidMount() {
    this.app = new PIXI.Application({
      autoresize: true,
      resolution: devicePixelRatio,
      backgroundColor: 0xffffff
    })

    this.app.renderer.resize(window.innerWidth, window.innerHeight - 100)

    window.addEventListener('resize', () => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight - 100)
    })

    const xMargin = (window.innerWidth - 450) / 2
    const yMargin = (window.innerHeight - 550) / 2

    const graphics = this.drawGraphics(xMargin, yMargin)
    this.app.stage.addChild(graphics)

    const sprite = this.makeSprite(this.app.renderer, xMargin, yMargin)
    sprite.x = 550 + xMargin
    sprite.y = 225 + yMargin
    this.app.stage.addChild(sprite)
    this.gameCanvas.appendChild(this.app.view)
    this.app.start()
  }

  componentWillUnmount() {
    this.app.stop()
  }

  render() {
    let component = this
    return (
      <div
        className="Canvas"
        ref={thisDiv => {
          component.gameCanvas = thisDiv
        }}
      />
    )
  }
}

export default Canvas
