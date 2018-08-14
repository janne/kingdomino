import isValid from './isValid'
import stack from './stack'
import getBoard from './getBoard'

const domino = stack[0]
const overlappingCastle = { dir: 0, x: 0, y: 0, domino }
const gapFromCastle = { dir: 0, x: 2, y: 0, domino }
const rotated3below = { dir: 3, x: 0, y: 2, domino }
const rotated1below = { dir: 1, x: 0, y: 1, domino }
const validPlacements = [
  { dir: 0, x: 1, y: 0, domino },
  { dir: 0, x: 3, y: 0, domino: stack[1] },
  { dir: 0, x: -2, y: 0, domino: stack[2] },
  { dir: 0, x: 3, y: 1, domino: stack[8] },
  { dir: 0, x: -2, y: 1, domino: stack[16] }
]

describe('isValid', () => {
  it('is false for undefined', () => {
    expect(isValid()).toEqual(false)
  })

  it('returns true for an empty kingdom', () => {
    expect(isValid([])).toEqual(true)
  })

  it('returns false if left part of domino is placed on the castle', () => {
    expect(isValid([overlappingCastle])).toEqual(false)
  })

  it('returns false if right part of domino is placed on the castle', () => {
    expect(isValid([{ ...overlappingCastle, x: -1 }])).toEqual(false)
  })

  it('returns false if gap between placement and other cards', () => {
    expect(isValid([gapFromCastle])).toEqual(false)
  })

  it('returns true if for rotated one step pieces below castle', () => {
    expect(isValid([rotated1below])).toEqual(true)
  })

  it('returns true if for rotated three steps pieces below castle', () => {
    expect(isValid([rotated3below])).toEqual(true)
  })

  it('returns false unless surrounding has same biome or castle', () => {
    expect(
      isValid([
        { dir: 0, x: 1, y: 0, domino: stack[1] },
        { dir: 0, x: 3, y: 0, domino }
      ])
    ).toEqual(false)
  })

  it('returns true for correct board', () => {
    expect(isValid(validPlacements)).toEqual(true)
  })

  it('allows for extra placements on a board', () => {
    const board = getBoard(validPlacements)
    const extraPlacement = { dir: 0, x: 0, y: -1, domino: stack[3] }
    expect(isValid([extraPlacement], board)).toEqual(true)
  })
})
