import {
  filter,
  isEmpty,
  head,
  difference,
  prop,
  sum,
  eqProps,
  concat
} from 'ramda'
import getBoard from './getBoard'
import stack from './stack'
import { getSurroundings, getLand } from './utils'

const getPoints = kingdom => {
  let board = getBoard(kingdom)
  let points = 0

  while (!isEmpty(board)) {
    const head = board.pop()
    let check = [head]
    let hits = [head]
    while (!isEmpty(check)) {
      const land = check.pop()
      const matching = filter(
        eqProps('biome', head),
        getSurroundings(land)
          .map(getLand(board))
          .filter(f => !!f)
      )
      check = concat(check, matching)
      hits = concat(hits, matching)
      board = difference(board, matching)
    }
    points += hits.length * sum(hits.map(prop('crowns')))
  }

  return points
}

export default getPoints
