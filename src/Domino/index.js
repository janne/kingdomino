import { connect } from 'react-redux'
import Domino from './Domino'
import { rotate } from '../store'

const mapStateToProps = state => {
  return { rotation: state.rotation }
}
const mapDispatchToProps = dispatch => ({
  rotate: () => dispatch(rotate())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Domino)
