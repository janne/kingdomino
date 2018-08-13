import React, { Component } from 'react'
import Canvas from './Canvas'
import './App.css'

class App extends Component {
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
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Kingdomino</h1>
        </header>
        <Canvas width={this.state.width} height={this.state.height} />
      </div>
    )
  }
}

export default App
