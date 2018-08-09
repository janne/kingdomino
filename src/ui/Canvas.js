import React, { Component } from 'react'
import './Canvas.css'
import * as PIXI from 'pixi.js'

class Canvas extends Component {
  app: PIXI.Application
  gameCanvas: HTMLDivElement

  constructor() {
    super()
  }

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

  componentDidMount() {
    this.app = new PIXI.Application(800, 452, {
      backgroundColor: 0xffffff
    })

    const graphics = this.drawGraphics()
    this.app.stage.addChild(graphics)

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
        class="Canvas"
        ref={thisDiv => {
          component.gameCanvas = thisDiv
        }}
      />
    )
  }
}

export default Canvas
