import { is } from 'ramda'
import getBoard from './getBoard'

const isValid = (placements, initialBoard = undefined) => {
  if (!is(Array, placements)) return false
  return getBoard(placements, initialBoard) !== null
}

export default isValid
