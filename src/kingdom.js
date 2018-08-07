import { equals, filter, find, pick, none, is } from 'ramda'
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

const matchBiome = expectedBiome => ({ biome }) =>
  [expectedBiome, CASTLE_BIOME].includes(biome)

const getBoard = kingdom =>
  kingdom.reduce(
    (board, placement) => {
      if (board === null) return null

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
        none(matchBiome(leftLand.biome), leftSurroundingLands) &&
        none(matchBiome(rightLand.biome), rightSurroundingLands)
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

export { getBoard, isValid }
