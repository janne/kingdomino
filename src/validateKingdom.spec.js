import validateKingdom from './validateKingdom'
import stack from './stack'

const domino = stack[0]

describe('validateKingdom', () => {
  it('is false for undefined', () => {
    expect(validateKingdom()).toEqual(false)
  })

  it('returns true for an empty kingdom', () => {
    expect(validateKingdom([])).toEqual(true)
  })

  it('returns false if left part of domino is placed on the castle', () => {
    expect(validateKingdom([{ dir: 0, x: 0, y: 0, domino }])).toEqual(false)
  })

  it('returns false if right part of domino is placed on the castle', () => {
    expect(validateKingdom([{ dir: 0, x: -1, y: 0, domino }])).toEqual(false)
  })

  it.only('returns true for correct board', () => {
    expect(validateKingdom([{ dir: 0, x: 1, y: 0, domino }])).toEqual(true)
  })
})
