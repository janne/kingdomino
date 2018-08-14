import { connect } from 'react-redux'
import Picked from './Picked'
import { rotate, startDragging, endDragging, moveTo } from '../store'

const mapStateToProps = state => {
  const { rotation, dragging, pos, previousPos, picked, placements } = state
  return { rotation, dragging, pos, previousPos, domino: picked, placements }
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
)(Picked)
