import React, { Component } from 'react'
import './Canvas.css'
import * as PIXI from 'pixi.js'

class Canvas extends Component {
  app: PIXI.Application
  gameCanvas: HTMLDivElement

  constructor() {
    super()
  }

  componentDidMount() {
    this.app = new PIXI.Application(800, 500, {
      backgroundColor: 0x1099bb
    })

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
