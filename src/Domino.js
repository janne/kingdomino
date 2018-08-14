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

  render() {
    const { width, height, placement } = this.props
    const containerProps = {
      x: (placement.x + 4) * height,
      y: (placement.y + 4) * height,
      rotation: placement.dir * (Math.PI / 2)
    }
    const renderSprite = (url, x = 0) => (
      <Sprite
        width={width / 2}
        height={height}
        x={x}
        texture={PIXI.Texture.fromImage(url)}
      />
    )
    return (
      <Container {...containerProps}>
        {renderSprite(this.leftImage())}
        {renderSprite(this.rightImage(), width / 2)}
      </Container>
    )
  }
}

export default Domino
