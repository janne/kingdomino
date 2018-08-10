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
      resolution: devicePixelRatio,
      backgroundColor: 0xffffff
    })

    this.board = new Board()

    window.addEventListener('resize', this.resize(this.app.renderer))
  }

  componentDidMount() {
    const xMargin = (window.innerWidth - 450) / 2
    const yMargin = (window.innerHeight - 550) / 2

    this.board.x = xMargin
    this.board.y = yMargin
    this.app.stage.addChild(this.board)

    const sprite = new Domino(this.app.renderer, xMargin, yMargin)
    sprite.x = 550 + xMargin
    sprite.y = 225 + yMargin
    this.app.stage.addChild(sprite)

    this.resize()

    this.gameCanvas.appendChild(this.app.view)
    this.app.start()
  }

  resize(renderer) {
    this.app.renderer.resize(window.innerWidth, window.innerHeight - 100)
    const xMargin = (window.innerWidth - 450) / 2
    const yMargin = (window.innerHeight - 550) / 2
    this.board.x = xMargin
    this.board.y = yMargin
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
