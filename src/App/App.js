import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Stage, Container } from 'react-pixi-fiber'
import Board from '../Board'
import Domino from '../Domino'

class App extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  componentDidMount() {
    this.props.resize(window.innerWidth, window.innerHeight)
    window.addEventListener('resize', () =>
      this.props.resize(window.innerWidth, window.innerHeight)
    )
  }

  render() {
    const { width, height } = this.props
    if (width < 100 || height < 100) return null
    const sideLength = (height < width ? height : width) - 40
    const dominoLength = sideLength / 9
    return (
      <Stage
        options={{ backgroundColor: 0xffffff }}
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

export default App
