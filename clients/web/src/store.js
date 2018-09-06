const RESIZE_WINDOW = 'resize_window'
const ROTATE = 'rotate'
const START_DRAGGING = 'start_dragging'
const END_DRAGGING = 'end_dragging'
const MOVE_TO = 'move_to'
const UPDATE_BOARD = 'update_board'

const initialState = {
  width: 0,
  height: 0,
  dragging: false,
  dir: 0,
  placements: [],
  picked: null,
  pos: { x: 0, y: 0 }
}

// Reducers //

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case RESIZE_WINDOW:
      const { width, height } = action
      return { ...state, width, height }
    case ROTATE:
      const dir = (state.dir + 1) % 4
      return { ...state, dir }
    case START_DRAGGING:
      const { previousPos } = action
      return { ...state, dragging: true, previousPos }
    case END_DRAGGING:
      return { ...state, dragging: false }
    case MOVE_TO:
      const { pos } = action
      return { ...state, pos }
    case UPDATE_BOARD:
      const { placements, picked } = action
      return { ...state, picked, placements }
    default:
      return state
  }
}

// Action creators //

export const updateBoard = ({ placements, picked }) => ({
  type: UPDATE_BOARD,
  placements,
  picked
})

export const init = () => dispatch => {
  return fetch('/api/init', { accept: 'application/json' })
    .then(resp => resp.json())
    .then(board => dispatch(updateBoard(board)))
}

export const attemptPlacement = (placement, newPos, oldPos) => dispatch => {
  return fetch('/api/validate', {
    body: JSON.stringify(placement),
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  })
    .then(resp => resp.json())
    .then(
      ({ ok }) => (ok ? dispatch(moveTo(newPos)) : dispatch(moveTo(oldPos)))
    )
}

export const resize = (width, height) => ({
  type: RESIZE_WINDOW,
  width,
  height
})

export const rotate = () => ({ type: ROTATE })

export const startDragging = previousPos => ({
  type: START_DRAGGING,
  previousPos
})

export const moveTo = pos => ({ type: MOVE_TO, pos })

export const endDragging = () => ({ type: END_DRAGGING })
