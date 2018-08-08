import getBoard from './getBoard'
import stack from './stack'

const domino = stack[0]
const overlappingCastle = { dir: 0, x: 0, y: 0, domino }
const validPlacements = [
  { dir: 0, x: 1, y: 0, domino },
  { dir: 0, x: 3, y: 0, domino: stack[1] },
  { dir: 0, x: -2, y: 0, domino: stack[2] },
  { dir: 0, x: 3, y: 1, domino: stack[8] },
  { dir: 0, x: -2, y: 1, domino: stack[16] }
]
const extraPlacement = { dir: 0, x: 0, y: -1, domino: stack[3] }

describe('getBoard', () => {
  it('returns null for invalid kingdoms', () => {
    expect(getBoard([overlappingCastle])).toEqual(null)
  })

  it('returns the board for a valid placement', () => {
    expect(getBoard([validPlacements[0]])).toEqual([
      { x: 0, y: 0, crowns: 0, biome: 'Castle' },
      { x: 1, y: 0, crowns: 0, biome: 'Field' },
      { x: 2, y: 0, crowns: 0, biome: 'Field' }
    ])
  })

  it('allows for extra placements on a board', () => {
    const board = getBoard(validPlacements)
    expect(board.length).toEqual(11)
    const board2 = getBoard([extraPlacement], board)
    expect(board2.length).toEqual(13)
  })
})
