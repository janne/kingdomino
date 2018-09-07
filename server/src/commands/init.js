import R from 'ramda'
import stack from '../stack'

const initialState = {
  placements: [
    { x: 1, y: 0, dir: 1, domino: stack[1] },
    { x: -2, y: 0, dir: 0, domino: stack[0] }
  ],
  deck: stack.slice(3),
  picked: stack[4]
}

export default ({ client }) => (req, res) => {
  client.setState(initialState)
  res.json(R.pick(['placements', 'picked'], initialState))
}
