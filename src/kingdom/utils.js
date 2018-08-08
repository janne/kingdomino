import { find, equals, pick } from 'ramda'

export const getLand = board => pos =>
  find(landPos => equals(pos, pick(['x', 'y'], landPos)), board)

export const getSurroundings = ({ x, y }) => [
  { x, y: y - 1 },
  { x, y: y + 1 },
  { x: x - 1, y },
  { x: x + 1, y }
]
