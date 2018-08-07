import { isValid, getBoard } from './kingdom'
import stack from './stack'

const [domino, domino2] = stack
const overlappingCastle = { dir: 0, x: 0, y: 0, domino }
const gapFromCastle = { dir: 0, x: 2, y: 0, domino }
const validPlacements = [
  { dir: 0, x: 1, y: 0, domino },
  { dir: 0, x: 3, y: 0, domino: domino2 }
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

  it('returns false unless surrounding has same biome or castle', () => {
    expect(
      isValid([
        { dir: 0, x: 1, y: 0, domino: domino2 },
        { dir: 0, x: 3, y: 0, domino }
      ])
    ).toEqual(false)
  })

  it('returns true for correct board', () => {
    expect(isValid(validPlacements)).toEqual(true)
  })
})

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
})
