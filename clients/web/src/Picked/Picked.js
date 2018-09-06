import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import { Sprite, Container } from 'react-pixi-fiber'

class Picked extends Component {
  static propTypes = {
    pos: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }).isRequired,
    previousPos: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    domino: PropTypes.arrayOf(PropTypes.object).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    dir: PropTypes.number.isRequired,
    dragging: PropTypes.bool.isRequired,
    rotate: PropTypes.func.isRequired,
    startDragging: PropTypes.func.isRequired,
    endDragging: PropTypes.func.isRequired,
    placements: PropTypes.arrayOf(PropTypes.object).isRequired
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

  render() {
    const { pos, width, height, dragging, dir } = this.props
    return (
      <Container
        ref="container"
        pointerdown={e => this.handlePointerDown(e)}
        pointerup={e => this.handlePointerUp()}
        pointerupoutside={e => this.handlePointerUp()}
        pointermove={e => this.handlePointerMove(e)}
        rotation={dir * (Math.PI / 2)}
        interactive={true}
        buttonMode={true}
        alpha={dragging ? 0.5 : 1}
        x={pos.x}
        y={pos.y}
        pivot={new PIXI.Point(width / 2, height / 2)}
      >
        <Sprite
          width={width / 2}
          height={height}
          texture={PIXI.Texture.fromImage(this.leftImage())}
        />
        <Sprite
          width={width / 2}
          height={height}
          x={width / 2}
          texture={PIXI.Texture.fromImage(this.rightImage())}
        />
      </Container>
    )
  }

  handlePointerDown(e) {
    this.props.startDragging({ x: e.target.x, y: e.target.y })
  }

  handlePointerMove(e) {
    if (this.props.dragging) {
      const { x, y } = e.data.getLocalPosition(this.refs.container.parent)
      this.props.moveTo({ x, y })
    }
  }

  handlePointerUp() {
    this.props.endDragging()

    const dominoLength = this.refs.container.height
    const { pos, previousPos, dir, placements, domino } = this.props

    if (previousPos.x === pos.x && previousPos.y === pos.y) {
      this.props.rotate()
    }

    const h = dir % 2 === 0

    const xPos = Math.floor((pos.x - (h ? dominoLength / 2 : 0)) / dominoLength)
    const yPos = Math.floor((pos.y - (h ? 0 : dominoLength / 2)) / dominoLength)

    const placement = {
      x: xPos - 4 + (dir === 2 ? 1 : 0),
      y: yPos - 4 + (dir === 3 ? 1 : 0),
      dir,
      domino
    }

    const isValid = () => false

    if (isValid([...placements, placement])) {
      const newPos = {
        x: xPos * dominoLength + dominoLength / 2 + (h ? dominoLength / 2 : 0),
        y: yPos * dominoLength + dominoLength / 2 + (h ? 0 : dominoLength / 2)
      }
      this.props.moveTo(newPos)
    } else {
      this.props.moveTo(previousPos)
    }
  }
}

export default Picked
