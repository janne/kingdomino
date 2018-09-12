import R from 'ramda'
import getBoard from '../getBoard'
import getPoints from '../getPoints'
import getLimits from '../getLimits'

export default ({ client }) => (req, res) => {
  client
    .getState()
    .then(state => {
      const { placements, picked } = state
      const pos = R.map(parseInt, R.pick(['x', 'y', 'dir'], req.body))
      const newPlacements = [...placements, { ...pos, domino: picked }]
      const board = getBoard(newPlacements)
      const ok = board !== null
      const newPicked = state.deck.pop()
      const points = getPoints(newPlacements)

      if (ok) {
        client.setState({
          ...state,
          placements: newPlacements,
          picked: newPicked
        })
      }

      res.send({
        ok,
        placements: newPlacements,
        picked: newPicked,
        points,
        limits: getLimits(board)
      })
    })
    .catch(error => res.send({ ok: false, error }))
}
