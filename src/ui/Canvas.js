import React, { Component } from 'react'
import Domino from './Domino'
import Board from './Board'
import { Stage, Container } from 'react-pixi-fiber'

class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: window.innerHeight - 100,
      width: window.innerWidth
    }
  }

  componentDidMount() {
    this.resize()()
    window.addEventListener('resize', this.resize())
  }

  resize() {
    return () => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight - 100
      })
    }
  }

  render() {
    return (
      <Stage
        options={{
          backgroundColor: 0xffffff,
          autoresize: true,
          resolution: devicePixelRatio
        }}
        width={this.state.width}
        height={this.state.height}
      >
        <Container x={this.state.width / 2 - 225} y={20}>
          <Board width={450} height={450} />
          <Domino width={100} height={50} x={520} y={450 / 2} />
        </Container>
      </Stage>
    )
  }
}

export default Canvas
