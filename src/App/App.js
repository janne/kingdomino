import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Stage, Container } from 'react-pixi-fiber'
import Board from '../Board'
import Domino from '../Domino'

class App extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    moveTo: PropTypes.func.isRequired
  }

  PADDING = 20
  GRID_SIZE = 9

  dominoStartPos() {
    const side = this.min(window.innerHeight, window.innerHeight) - this.PADDING
    const domino = side / this.GRID_SIZE
    return { x: side + 2 * domino, y: side / 2 }
  }

  componentDidMount() {
    this.props.resize(window.innerWidth, window.innerHeight)
    this.props.moveTo(this.dominoStartPos())
    window.addEventListener('resize', () => {
      this.props.resize(window.innerWidth, window.innerHeight)
      this.props.moveTo(this.dominoStartPos())
    })
  }

  min(a, b) {
    return a < b ? a : b
  }

  render() {
    const { width, height } = this.props
    if (width < 100 || height < 100) return null

    const side = this.min(width, height) - this.PADDING
    const domino = side / this.GRID_SIZE

    return (
      <Stage
        options={{ backgroundColor: 0xffffff }}
        width={width}
        height={height}
      >
        <Container x={width / 2 - side / 2} y={height / 2 - side / 2}>
          <Board width={side} height={side} />
          <Domino width={2 * domino} height={domino} />
        </Container>
      </Stage>
    )
  }
}

export default App
