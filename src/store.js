import stack from './kingdom/stack'

const RESIZE_WINDOW = 'resize_window'
const ROTATE = 'rotate'
const START_DRAGGING = 'start_dragging'
const END_DRAGGING = 'end_dragging'
const MOVE_TO = 'move_to'

const initialState = {
  width: 0,
  height: 0,
  placements: [
    { x: 1, y: 0, dir: 0, domino: stack[1] },
    { x: -2, y: 0, dir: 0, domino: stack[0] }
  ],
  deck: stack.slice(3),
  dragging: false,
  picked: stack[4],
  rotation: 0,
  pos: { x: 0, y: 0 }
}

// Reducers //

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case RESIZE_WINDOW:
      const { width, height } = action
      return { ...state, width, height }
    case ROTATE:
      const rotation = (state.rotation + 1) % 4
      return { ...state, rotation }
    case START_DRAGGING:
      const { previousPos } = action
      return { ...state, dragging: true, previousPos }
    case END_DRAGGING:
      return { ...state, dragging: false }
    case MOVE_TO:
      const { pos } = action
      return { ...state, pos }
    default:
      return state
  }
}

// Action creators //

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
