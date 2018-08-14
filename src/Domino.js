import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import { Sprite, Container } from 'react-pixi-fiber'

class Domino extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    placement: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      dir: PropTypes.number,
      domino: PropTypes.array
    }).isRequired
  }

  toImageUrl({ biome, crowns }) {
    return `images/${biome}_${crowns}.png`
  }

  leftImage() {
    return this.toImageUrl(this.props.placement.domino[0])
  }

  rightImage() {
    return this.toImageUrl(this.props.placement.domino[1])
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
    const { width, height, placement } = this.props
    const h = placement.dir % 2 === 0
    const xPos = placement.x + 4 - (placement.dir === 2 ? 1 : 0)
    const yPos = placement.y + 4 - (placement.dir === 3 ? 1 : 0)
    const containerProps = {
      x: xPos * height + height / 2 + (h ? height / 2 : 0),
      y: yPos * height + height / 2 + (h ? 0 : height / 2),
      rotation: placement.dir * (Math.PI / 2),
      pivot: new PIXI.Point(width / 2, height / 2)
    }
    return (
      <Container {...containerProps}>
        {this.renderSprite(this.leftImage())}
        {this.renderSprite(this.rightImage(), width / 2)}
      </Container>
    )
  }
}

export default Domino
