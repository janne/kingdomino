import R from 'ramda'
import getBoard from '../getBoard'

export default ({ client }) => (req, res) => {
  client
    .getState()
    .then(state => {
      const { placements, picked } = state
      const pos = R.map(parseInt, R.pick(['x', 'y', 'dir'], req.body))
      const placement = { ...pos, domino: picked }
      const ok = getBoard([...placements, placement]) !== null
      res.send({ ok })
    })
    .catch(error => res.send({ ok: false, error }))
}
