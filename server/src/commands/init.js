import R from 'ramda'
import stack from '../stack'

let seed = new Date().getTime()

const random = () => {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

const initialState = () => {
  const deck = shuffle(stack)
  const picked = deck.pop()
  return { placements: [], deck, picked }
}

export default ({ client }) => (req, res) => {
  const state = initialState()
  client.setState(state)
  res.json(R.pick(['placements', 'picked'], state))
}
