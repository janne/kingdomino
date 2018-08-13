import React, { Component } from 'react'
import Domino from './Domino'
import Board from './Board'
import { Stage } from 'react-pixi-fiber'

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
        <Board width={450} height={450} x={this.state.width / 2 - 225} y={20} />
        <Domino
          width={100}
          height={50}
          x={this.state.width / 2 + 270}
          y={245}
        />
      </Stage>
    )
  }
}

export default Canvas
