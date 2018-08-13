import React, { Component } from 'react'
import Domino from './Domino'
import Board from './Board'
import { Stage, Container } from 'react-pixi-fiber'

class Canvas extends Component {
  render() {
    const { width, height } = this.props
    const sideLength = (height < width ? height : width) - 40
    const dominoLength = sideLength / 9
    return (
      <Stage
        options={{
          backgroundColor: 0xffffff,
          autoresize: true,
          resolution: devicePixelRatio
        }}
        width={width}
        height={height}
      >
        <Container
          x={width / 2 - sideLength / 2}
          y={height / 2 - sideLength / 2}
        >
          <Board width={sideLength} height={sideLength} />
          <Domino
            width={2 * dominoLength}
            height={dominoLength}
            x={sideLength + 2 * dominoLength}
            y={sideLength / 2}
          />
        </Container>
      </Stage>
    )
  }
}

export default Canvas
