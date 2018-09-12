import { connect } from 'react-redux'
import { pick } from 'ramda'
import App from './App'
import { resize, moveTo } from '../store'

const mapStateToProps = pick([
  'width',
  'height',
  'placements',
  'picked',
  'points',
  'limits'
])

const mapDispatchToProps = dispatch => {
  return {
    resize: (width, height) => dispatch(resize(width, height)),
    moveTo: pos => dispatch(moveTo(pos))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
