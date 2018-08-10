import React, { Component } from 'react'
import './Canvas.css'
import Domino from './Domino'
import Board from './Board'
import * as PIXI from 'pixi.js'

class Canvas extends Component {
  constructor() {
    super()
    this.app = new PIXI.Application({
      autoresize: true,
      backgroundColor: 0xffffff,
      resolution: devicePixelRatio
    })

    this.board = new Board()

    this.container = new PIXI.Container()

    window.addEventListener('resize', this.resize())
  }

  componentDidMount() {
    this.container.addChild(this.board)

    const domino = new Domino(this.app.renderer)
    domino.x = 550
    domino.y = 225
    this.container.addChild(domino)

    this.app.stage.addChild(this.container)

    this.resize()()

    this.gameCanvas.appendChild(this.app.view)
    this.app.start()
  }

  resize() {
    return () => {
      this.app.renderer.resize(window.innerWidth, window.innerHeight - 100)
      this.container.x = (window.innerWidth - 450) / 2
      this.container.y = (window.innerHeight - 550) / 2
    }
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
