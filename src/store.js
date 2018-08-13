const RESIZE_WINDOW = 'resize_window'

const initialState = { width: 0, height: 0 }

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case RESIZE_WINDOW:
      const { width, height } = action
      return { ...state, width, height }
    default:
      return state
  }
}

export const resize = (width, height) => ({
  type: RESIZE_WINDOW,
  width,
  height
})
