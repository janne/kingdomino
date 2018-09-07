import R from 'ramda'
import stack from '../stack'

const picked = stack.pop()
const initialState = {
  placements: [],
  deck: stack,
  picked
}

export default ({ client }) => (req, res) => {
  client.setState(initialState)
  res.json(R.pick(['placements', 'picked'], initialState))
}
