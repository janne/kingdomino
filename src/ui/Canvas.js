import React, { Component } from 'react'
import './Canvas.css'
import * as PIXI from 'pixi.js'

class Canvas extends Component {
  app: PIXI.Application
  gameCanvas: HTMLDivElement

  drawGraphics() {
    var graphics = new PIXI.Graphics()
    graphics.lineStyle(1, 0xe0e0e0, 1)

    for (let y = 0; y < 10; y++) {
      graphics.moveTo(1, y * 50 + 1)
      graphics.lineTo(450, y * 50 + 1)
      for (let x = 0; x < 10; x++) {
        graphics.moveTo(x * 50 + 1, 1)
        graphics.lineTo(x * 50 + 1, 450)
      }
    }

    graphics.lineStyle(1, 0, 1)
    graphics.beginFill(0x88ee88)
    graphics.drawRect(202, 202, 48, 48)
    graphics.endFill()

    return graphics
  }

  makeSprite(renderer) {
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xff22aa)
    graphics.drawRect(0, 0, 99, 49)
    graphics.endFill()
    const texture = renderer.generateTexture(graphics)
    const sprite = new PIXI.Sprite(texture)
    sprite.interactive = true
    sprite.buttonMode = true
    sprite.anchor.set(0.5)

    sprite
      .on('mousedown', event => {
        sprite.data = event.data
        sprite.alpha = 0.5
        sprite.dragging = true
      })

      .on('mouseup', () => {
        sprite.alpha = 1
        sprite.dragging = false
        sprite.data = null
        sprite.x = Math.floor((sprite.x + 25) / 50) * 50 + 1
        sprite.y = Math.floor(sprite.y / 50) * 50 + 26
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
    this.app = new PIXI.Application(800, 452, {
      backgroundColor: 0xffffff
    })

    const graphics = this.drawGraphics()
    this.app.stage.addChild(graphics)

    const sprite = this.makeSprite(this.app.renderer)
    sprite.x = 550
    sprite.y = 200
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
