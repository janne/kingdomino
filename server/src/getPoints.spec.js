import getPoints from './getPoints'
import dominos from './fixtures/dominos'

const board = [
  { dir: 0, x: 1, y: 0, domino: dominos[0] },
  { dir: 0, x: -2, y: 0, domino: dominos[1] },
  { dir: 0, x: -1, y: -1, domino: dominos[2] },
  { dir: 0, x: -1, y: 1, domino: dominos[3] },
  { dir: 0, x: -1, y: -2, domino: dominos[4] }
]

describe('getPoints', () => {
  it('returns 0 for empty board', () => {
    expect(getPoints([])).toEqual(0)
  })

  it('returns correct points for valid kingdom', () => {
    expect(getPoints(board)).toEqual(8)
  })
})
