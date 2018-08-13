import stack from './kingdom/stack'

const RESIZE_WINDOW = 'resize_window'
const ROTATE = 'rotate'

const initialState = {
  width: 0,
  height: 0,
  picked: stack[0],
  deck: stack.slice(1),
  rotation: 0
}

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case RESIZE_WINDOW:
      const { width, height } = action
      return { ...state, width, height }
    case ROTATE:
      const rotation = (state.rotation + 1) % 4
      return { ...state, rotation }
    default:
      return state
  }
}

export const resize = (width, height) => ({
  type: RESIZE_WINDOW,
  width,
  height
})

export const rotate = () => ({ type: ROTATE })
