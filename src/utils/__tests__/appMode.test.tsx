import { mockAppMode } from 'src/testHelpers'
import { appMode, isAllStatesMode, isAppMode, isRestricted, isStateMode } from '../appMode'
import { StateAbbreviation } from '../statesAndTerritories'

beforeEach(() => {
  mockAppMode('NJ')
})

describe('appMode', () => {
  it('is NJ when configured to NJ', () => {
    mockAppMode('NJ')
    expect(appMode()).toEqual('NJ')
  })

  it('is NJ when unconfigured', () => {
    mockAppMode(undefined)
    expect(appMode()).toEqual('NJ')
  })

  it('is all states when configured to all states', () => {
    mockAppMode('ALL')
    expect(appMode()).toEqual('ALL')
  })
})

describe('isAppMode', () => {
  it('is true when the appMode is the given mode', () => {
    mockAppMode(undefined)
    expect(isAppMode('NJ')).toEqual(true)

    mockAppMode('CA')
    expect(isAppMode('CA')).toEqual(true)

    mockAppMode('NJ')
    expect(isAppMode('NJ')).toEqual(true)

    mockAppMode('WY')
    expect(isAppMode('WY')).toEqual(true)
  })

  it('is false when the appMode is not the given mode', () => {
    mockAppMode(undefined)
    expect(isAppMode('NY')).toEqual(false)

    mockAppMode('CA')
    expect(isAppMode('NY')).toEqual(false)
    expect(isAppMode('NJ')).toEqual(false)
  })
})

describe('isAllStatesMode', () => {
  it('is true when in all states mode', () => {
    mockAppMode('ALL')
    expect(isAllStatesMode()).toEqual(true)
  })

  it('is false when not in all states mode', () => {
    mockAppMode(undefined)
    expect(isAllStatesMode()).toEqual(false)
    mockAppMode('NJ')
    expect(isAllStatesMode()).toEqual(false)
  })
})

describe('isStateMode', () => {
  it('is false when in not in state mode', () => {
    mockAppMode('ALL')
    expect(isStateMode()).toEqual(false)
  })

  it('is true when in state mode', () => {
    mockAppMode(undefined)
    expect(isStateMode()).toEqual(true)
    mockAppMode('CA')
    expect(isStateMode()).toEqual(true)
  })
})

describe('isRestricted', () => {
  it('is false when all states', () => {
    mockAppMode('ALL')
    expect(isRestricted()).toEqual(false)
  })

  it('is false when NJ', () => {
    mockAppMode('NJ')
    expect(isRestricted()).toEqual(false)
  })

  it('is true when not all states or NJ', () => {
    const stateAbbreviations: StateAbbreviation[] = ['AK', 'CA', 'KY', 'WY']

    stateAbbreviations.forEach((state) => {
      mockAppMode(state)
      expect(isRestricted()).toEqual(true)
    })
  })
})
