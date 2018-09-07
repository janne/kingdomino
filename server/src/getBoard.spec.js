import R from 'ramda'
import getBoard from './getBoard'
import stack from './stack'

const domino = stack[0]
const overlappingCastle = { dir: 0, x: 0, y: 0, domino }
const gapFromCastle = { dir: 0, x: 2, y: 0, domino }
const validPlacements = [
  { dir: 0, x: 1, y: 0, domino },
  { dir: 0, x: 3, y: 0, domino: stack[1] },
  { dir: 0, x: -2, y: 0, domino: stack[2] },
  { dir: 0, x: 3, y: 1, domino: stack[8] },
  { dir: 0, x: -2, y: 1, domino: stack[16] }
]
const rotated3below = { dir: 3, x: 0, y: 2, domino }
const rotated1below = { dir: 1, x: 0, y: 1, domino }
const extraPlacement = { dir: 0, x: 0, y: -1, domino: stack[3] }

describe('getBoard', () => {
  it('returns initial board for undefined', () => {
    expect(getBoard()).toEqual([{ biome: 'CASTLE', crowns: 0, x: 0, y: 0 }])
  })

  it('returns null if left part of domino is placed on the castle', () => {
    expect(getBoard([overlappingCastle])).toEqual(null)
  })

  it('returns null if right part of domino is placed on the castle', () => {
    expect(getBoard([{ ...overlappingCastle, x: -1 }])).toEqual(null)
  })

  it('returns null if gap between placement and other cards', () => {
    expect(getBoard([gapFromCastle])).toEqual(null)
  })

  it('returns null unless surrounding has same biome or castle', () => {
    expect(
      getBoard([
        { dir: 0, x: 1, y: 0, domino: stack[1] },
        { dir: 0, x: 3, y: 0, domino }
      ])
    ).toEqual(null)
  })

  it('returns the board for a valid placement', () => {
    expect(getBoard(validPlacements) === null).toEqual(false)
  })

  it('returns the board for rotated one step pieces below castle', () => {
    expect(getBoard([rotated1below]) === null).toEqual(false)
  })

  it('returns the board for rotated three steps pieces below castle', () => {
    expect(getBoard([rotated3below]) === null).toEqual(false)
  })

  it('allows for extra placements on a board', () => {
    const board = getBoard(validPlacements)
    expect(board.length).toEqual(11)
    const board2 = getBoard([extraPlacement], board)
    expect(board2.length).toEqual(13)
  })
})
