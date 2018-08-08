import getPoints from './getPoints'
import stack from './stack'

const board = [
  { dir: 0, x: 1, y: 0, domino: stack[0] },
  { dir: 0, x: 3, y: 0, domino: stack[1] },
  { dir: 0, x: -2, y: 0, domino: stack[2] },
  { dir: 0, x: 3, y: 1, domino: stack[8] },
  { dir: 0, x: -2, y: 1, domino: stack[16] }
]

describe('getPoints', () => {
  it('returns 0 for empty board', () => {
    expect(getPoints([])).toEqual(0)
  })

  it('returns correct points for valid kingdom', () => {
    expect(getPoints(board)).toEqual(11)
  })
})
