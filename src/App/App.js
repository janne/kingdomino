import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Stage, Container } from 'react-pixi-fiber'
import Board from '../Board'
import Picked from '../Picked'

class App extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    moveTo: PropTypes.func.isRequired
  }

  PADDING = 20
  GRID_SIZE = 9

  dominoStartPos() {
    const boardSide =
      this.min(window.innerHeight, window.innerHeight) - this.PADDING
    const dominoSide = boardSide / this.GRID_SIZE
    return { x: boardSide + 2 * dominoSide, y: boardSide / 2 }
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

    const boardSide = this.min(width, height) - this.PADDING
    const dominoSide = boardSide / this.GRID_SIZE

    return (
      <Stage
        options={{ backgroundColor: 0xffffff }}
        width={width}
        height={height}
      >
        <Container x={width / 2 - boardSide / 2} y={height / 2 - boardSide / 2}>
          <Board width={boardSide} height={boardSide} />
          <Picked width={2 * dominoSide} height={dominoSide} />
        </Container>
      </Stage>
    )
  }
}

export default App
