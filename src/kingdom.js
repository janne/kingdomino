import {
  concat,
  equals,
  filter,
  find,
  pick,
  none,
  is,
  isEmpty,
  head,
  difference,
  prop,
  sum,
  eqProps
} from 'ramda'
import stack from './stack'

const CASTLE_BIOME = 'Castle'

const getLeftPos = ({ x, y }) => ({ x, y })
const getRightPos = ({ x, y, dir }) => {
  switch (dir) {
    case 0:
      return { x: x + 1, y }
    case 1:
      return { x, y: y + 1 }
    case 2:
      return { x: x - 1, y }
    case 3:
      return { x, y: y - 1 }
  }
}

const getLand = board => pos =>
  find(landPos => equals(pos, pick(['x', 'y'], landPos)), board)

const getSurroundings = ({ x, y }) => [
  { x, y: y - 1 },
  { x, y: y + 1 },
  { x: x - 1, y },
  { x: x + 1, y }
]

const getSurroundingLands = (aroundPos, board) =>
  filter(f => !!f, getSurroundings(aroundPos).map(getLand(board)))

const getBoard = kingdom =>
  kingdom.reduce(
    (board, placement) => {
      if (!board) return null

      const leftPos = getLeftPos(placement)
      const getLandOnPos = getLand(board)
      if (getLandOnPos(leftPos)) return null
      const leftLand = { ...leftPos, ...placement.domino[0] }
      const leftSurroundingLands = getSurroundingLands(leftPos, board)

      const rightPos = getRightPos(placement)
      if (getLandOnPos(rightPos)) return null
      const rightLand = { ...rightPos, ...placement.domino[1] }
      const rightSurroundingLands = getSurroundingLands(rightPos, board)

      if (equals(leftSurroundingLands, []) && equals(rightSurroundingLands, []))
        return null

      if (
        none(eqProps('biome', leftLand), leftSurroundingLands) &&
        none(eqProps('biome', rightLand), rightSurroundingLands) &&
        none(
          eqProps('biome', { biome: CASTLE_BIOME }),
          concat(leftSurroundingLands, rightSurroundingLands)
        )
      )
        return null

      return [...board, leftLand, rightLand]
    },
    [{ x: 0, y: 0, biome: 'Castle', crowns: 0 }]
  )

const isValid = kingdom => {
  if (!is(Array, kingdom)) return false
  return getBoard(kingdom) !== null
}

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

export { getBoard, getPoints, isValid }
