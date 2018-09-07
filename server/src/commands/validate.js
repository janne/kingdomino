import R from 'ramda'
import getBoard from '../getBoard'

export default ({ client }) => (req, res) => {
  client
    .getState()
    .then(state => {
      const { placements, picked } = state
      const pos = R.map(parseInt, R.pick(['x', 'y', 'dir'], req.body))
      const newPlacements = [...placements, { ...pos, domino: picked }]
      const ok = getBoard(newPlacements) !== null
      if (ok) {
        client.setState({ ...state, placements: newPlacements })
      }
      res.send({ ok, placements: newPlacements, picked })
    })
    .catch(error => res.send({ ok: false, error }))
}
