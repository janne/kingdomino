import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import { Sprite, Container } from 'react-pixi-fiber'

class Domino extends Component {
  render() {
    const anchor = new PIXI.Point(0.5, 0.5)
    return (
      <Container
        pointerdown={this.handlePointerDown}
        pointerup={this.handlePointerUp}
        pointerupoutside={this.handlePointerUp}
        pointermove={this.handlePointerMove}
        interactive={true}
        buttonMode={true}
        interactiveChildren={false}
        anchor={anchor}
        rotation={Math.PI / 10}
      >
        <Sprite
          width={this.props.width / 2}
          height={this.props.height}
          x={this.props.x}
          y={this.props.y}
          rotation={Math.PI / 10}
          anchor={anchor}
          texture={PIXI.Texture.fromImage('images/FIELD_0.png')}
        />
        <Sprite
          width={this.props.width / 2}
          height={this.props.height}
          x={this.props.x + this.props.width / 2}
          y={this.props.y}
          rotation={Math.PI / 10}
          anchor={anchor}
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

    if (this.previousX === this.x && this.previousY === this.y) {
      this.rotation += Math.PI / 2
      if (this.rotation === Math.PI * 2) {
        this.rotation = 0
      }
    }

    const h = this.rotation === 0 || this.rotation === Math.PI

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
}

export default Domino
