import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import { Sprite, Container } from 'react-pixi-fiber'

class Domino extends Component {
  render() {
    const { x, y, width, height } = this.props
    return (
      <Container
        pointerdown={this.handlePointerDown}
        pointerup={this.handlePointerUp}
        pointerupoutside={this.handlePointerUp}
        pointermove={this.handlePointerMove}
        interactive={true}
        buttonMode={true}
        x={x}
        y={y}
        pivot={new PIXI.Point(width / 2, height / 2)}
      >
        <Sprite
          width={width / 2}
          height={height}
          texture={PIXI.Texture.fromImage('images/FIELD_0.png')}
        />
        <Sprite
          width={width / 2}
          height={height}
          x={width / 2}
          texture={PIXI.Texture.fromImage('images/FIELD_1.png')}
        />
      </Container>
    )
  }

  handlePointerDown(event) {
    this.data = event.data
    this.alpha = 0.5
    this.dragging = true
    this.previousX = this.x
    this.previousY = this.y
  }

  handlePointerMove() {
    if (this.dragging) {
      var newPosition = this.data.getLocalPosition(this.parent)
      this.x = newPosition.x
      this.y = newPosition.y
    }
  }

  handlePointerUp() {
    this.alpha = 1
    this.dragging = false
    this.data = null

    const dominoLength = this.height

    if (this.previousX === this.x && this.previousY === this.y) {
      this.rotation += Math.PI / 2
      if (this.rotation === Math.PI * 2) {
        this.rotation = 0
      }
    }

    const h = this.rotation === 0 || this.rotation === Math.PI

    const xPos = Math.floor(
      (this.x - (h ? dominoLength / 2 : 0)) / dominoLength
    )
    const yPos = Math.floor(
      (this.y - (h ? 0 : dominoLength / 2)) / dominoLength
    )
    if (xPos >= 0 && yPos >= 0 && xPos < 9 && yPos < 9) {
      this.x =
        xPos * dominoLength + dominoLength / 2 + (h ? dominoLength / 2 : 0)
      this.y =
        yPos * dominoLength + dominoLength / 2 + (h ? 0 : dominoLength / 2)
    } else {
      this.x = this.previousX
      this.y = this.previousY
    }
  }
}

export default Domino
