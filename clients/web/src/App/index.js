import { connect } from 'react-redux'
import App from './App'
import { resize, moveTo } from '../store'

const mapStateToProps = state => {
  const { width, height, placements, picked } = state
  return { width, height, placements, picked }
}
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
