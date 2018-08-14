import { connect } from 'react-redux'
import Domino from './Domino'
import { rotate, startDragging, endDragging, moveTo } from '../store'

const mapStateToProps = state => {
  const { rotation, dragging, pos, previousPos, picked } = state
  return { rotation, dragging, pos, previousPos, picked }
}

const mapDispatchToProps = dispatch => ({
  rotate: () => dispatch(rotate()),
  startDragging: previousPos => dispatch(startDragging(previousPos)),
  endDragging: () => dispatch(endDragging()),
  moveTo: pos => dispatch(moveTo(pos))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Domino)
