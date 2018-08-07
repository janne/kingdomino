import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Kingdomino</h1>
        </header>
        <p className="App-intro">
          The boardgame{' '}
          <a href="http://www.blueorangegames.com/index.php/games/king-domino">
            Kingdomino
          </a>{' '}
          by <a href="http://www.blueorangegames.com/">Blue Orange Games</a>,
          developed by <a href="https://github.com/janne">Jan Andersson</a> in
          Javascript.
        </p>
      </div>
    )
  }
}

export default App
