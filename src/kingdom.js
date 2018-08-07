import { equals, filter, find, pick, none } from 'ramda'
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

const getLand = (pos, board) =>
  find(landPos => equals(pos, pick(['x', 'y'], landPos)), board)

const getSurroundingLands = ({ x, y }, board) =>
  filter(f => !!f, [
    getLand({ x, y: y - 1 }, board),
    getLand({ x, y: y + 1 }, board),
    getLand({ y, x: x - 1 }, board),
    getLand({ y, x: x + 1 }, board)
  ])

const matchBiome = expectedBiome => ({ biome }) =>
  [expectedBiome, CASTLE_BIOME].includes(biome)

const getBoard = kingdom =>
  kingdom.reduce(
    (board, placement) => {
      if (board === null) return null

      const leftPos = getLeftPos(placement)
      if (getLand(leftPos, board)) return null
      const leftLand = { ...leftPos, ...placement.domino[0] }
      const leftSurroundingLands = getSurroundingLands(leftPos, board)

      const rightPos = getRightPos(placement)
      if (getLand(rightPos, board)) return null
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
  if (!Array.isArray(kingdom)) return false
  return getBoard(kingdom) !== null
}

export { getBoard, isValid }
