import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import { Sprite, Container } from 'react-pixi-fiber'

class Domino extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    dir: PropTypes.number.isRequired,
    domino: PropTypes.array.isRequired
  }

  toImageUrl({ biome, crowns }) {
    return `/images/${biome}_${crowns}.png`
  }

  leftImage() {
    return this.toImageUrl(this.props.domino[0])
  }

  rightImage() {
    return this.toImageUrl(this.props.domino[1])
  }

  renderSprite(url, x = 0) {
    return (
      <Sprite
        width={this.props.width / 2}
        height={this.props.height}
        x={x}
        texture={PIXI.Texture.fromImage(url)}
      />
    )
  }

  render() {
    const { width, height, x, y, dir } = this.props
    const rotation = dir * (Math.PI / 2)
    const pivot = new PIXI.Point(width / 2, height / 2)

    return (
      <Container x={x} y={y} rotation={rotation} pivot={pivot}>
        {this.renderSprite(this.leftImage())}
        {this.renderSprite(this.rightImage(), width / 2)}
      </Container>
    )
  }
}

export default Domino
