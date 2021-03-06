import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Stage, Container, Text } from 'react-pixi-fiber'
import Board from './Board'
import Picked from './Picked'
import Domino from './Domino'

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
    const { width, height, placements, picked, points, limits } = this.props

    if (width < 100 || height < 100) return null

    const boardSide = this.min(width, height) - this.PADDING
    const dominoSide = boardSide / this.GRID_SIZE
    const renderDomino = (placement, index) => {
      const h = placement.dir % 2 === 0
      const xPos = placement.x + 4 - (placement.dir === 2 ? 1 : 0)
      const yPos = placement.y + 4 - (placement.dir === 3 ? 1 : 0)
      const x = xPos * dominoSide + dominoSide / 2 + (h ? dominoSide / 2 : 0)
      const y = yPos * dominoSide + dominoSide / 2 + (h ? 0 : dominoSide / 2)
      return (
        <Domino
          width={2 * dominoSide}
          height={dominoSide}
          x={x}
          y={y}
          dir={placement.dir}
          domino={placement.domino}
          key={index}
        />
      )
    }
    const dominos = placements.map(renderDomino)

    const score = `Points: ${points || 0}`
    return (
      <Stage
        options={{ backgroundColor: 0xffffff }}
        width={width}
        height={height}
      >
        <Container x={width / 2 - boardSide / 2} y={height / 2 - boardSide / 2}>
          <Board
            maxWidth={boardSide}
            maxHeight={boardSide}
            minX={limits.min.x}
            maxX={limits.max.x}
            minY={limits.min.y}
            maxY={limits.max.y}
          />
          {picked && <Picked width={2 * dominoSide} height={dominoSide} />}
          {dominos}
        </Container>
        <Text text={score} x={20} y={20} />
      </Stage>
    )
  }
}

export default App
