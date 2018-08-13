import { connect } from 'react-redux'
import App from './App'
import { resize } from '../store'

const mapStateToProps = state => {
  const { width, height } = state
  return { width, height }
}
const mapDispatchToProps = dispatch => {
  return {
    resize: (width, height) => dispatch(resize(width, height))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
