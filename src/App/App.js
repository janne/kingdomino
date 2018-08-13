import React, { Component } from 'react'
import Canvas from '../Canvas'

class App extends Component {
  componentDidMount() {
    this.props.resize(window.innerWidth, window.innerHeight)
    window.addEventListener('resize', () =>
      this.props.resize(window.innerWidth, window.innerHeight)
    )
  }

  render() {
    return (
      <div className="App">
        <Canvas width={this.props.width} height={this.props.height} />
      </div>
    )
  }
}

export default App
