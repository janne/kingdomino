import R from 'ramda'
import { getSurroundings, getLand } from './utils'
import { CASTLE_BIOME } from './constants'

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
    default:
      return undefined
  }
}

const getSurroundingLands = (aroundPos, board) =>
  R.filter(f => !!f, getSurroundings(aroundPos).map(getLand(board)))

const min = (a, b) => (a < b ? a : b)
const max = (a, b) => (a > b ? a : b)

const getMinMax = placements =>
  placements.reduce(
    (acc, placement) => ({
      min: {
        x: min(acc.min.x, placement.x),
        y: min(acc.min.y, placement.y)
      },
      max: {
        x: max(acc.max.x, placement.x),
        y: max(acc.max.y, placement.y)
      }
    }),
    { min: { x: 0, y: 0 }, max: { x: 0, y: 0 } }
  )

const getBoard = (
  placements = [],
  initialBoard = [{ x: 0, y: 0, biome: CASTLE_BIOME, crowns: 0 }]
) => {
  const board = placements.reduce((board, placement) => {
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

    if (
      R.equals(leftSurroundingLands, []) &&
      R.equals(rightSurroundingLands, [])
    )
      return null

    if (
      R.none(R.eqProps('biome', leftLand), leftSurroundingLands) &&
      R.none(R.eqProps('biome', rightLand), rightSurroundingLands) &&
      R.none(
        R.eqProps('biome', { biome: CASTLE_BIOME }),
        R.concat(leftSurroundingLands, rightSurroundingLands)
      )
    )
      return null

    return [...board, leftLand, rightLand]
  }, initialBoard)
  if (board === null) return null

  const minMax = getMinMax(board)
  if (minMax.max.x - minMax.min.x > 4) return null
  if (minMax.max.y - minMax.min.y > 4) return null

  return board
}

export default getBoard
