import { is } from 'ramda'
import getBoard from './getBoard'

const isValid = kingdom => {
  if (!is(Array, kingdom)) return false
  return getBoard(kingdom) !== null
}

export default isValid
