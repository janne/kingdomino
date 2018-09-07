import { connect } from 'react-redux'
import Picked from './Picked'
import { rotate, startDragging, endDragging, moveTo, place } from '../store'

const mapStateToProps = state => {
  const { dir, dragging, pos, previousPos, picked, placements } = state
  return { dir, dragging, pos, previousPos, domino: picked, placements }
}

const mapDispatchToProps = dispatch => ({
  rotate: () => dispatch(rotate()),
  startDragging: previousPos => dispatch(startDragging(previousPos)),
  endDragging: () => dispatch(endDragging()),
  moveTo: pos => dispatch(moveTo(pos)),
  place: (placement, newPos, oldPos) =>
    dispatch(place(placement, newPos, oldPos))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Picked)
