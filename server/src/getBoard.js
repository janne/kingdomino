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

const getBoard = (
  placements = [],
  initialBoard = [{ x: 0, y: 0, biome: CASTLE_BIOME, crowns: 0 }]
) =>
  placements.reduce((board, placement) => {
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

export default getBoard
