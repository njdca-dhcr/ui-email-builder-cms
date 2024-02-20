import Config from '../../../gatsby-config'
import { appMode, isAllStatesMode, isNJMode } from '../appMode'

jest.mock('../../../gatsby-config', () => {
  return {
    sideMetadata: {
      appMode: 'NJ',
    },
  }
})

describe('appMode', () => {
  it('is NJ when configured to NJ', () => {
    Config.siteMetadata = { appMode: 'NJ' }
    expect(appMode()).toEqual('NJ')
  })

  it('is NJ when unconfigured', () => {
    Config.siteMetadata = { appMode: undefined }
    expect(appMode()).toEqual('NJ')
  })

  it('is all states when configured to all states', () => {
    Config.siteMetadata = { appMode: 'ALL' }
    expect(appMode()).toEqual('ALL')
  })
})

describe('isNJMode', () => {
  it('is true when in NJ mode', () => {
    Config.siteMetadata = { appMode: undefined }
    expect(isNJMode()).toEqual(true)

    Config.siteMetadata = { appMode: 'NJ' }
    expect(isNJMode()).toEqual(true)
  })

  it('is false when not in NJ mode', () => {
    Config.siteMetadata = { appMode: 'ALL' }
    expect(isNJMode()).toEqual(false)
  })
})

describe('isAllStatesMode', () => {
  it('is true when in all states mode', () => {
    Config.siteMetadata = { appMode: 'ALL' }
    expect(isAllStatesMode()).toEqual(true)
  })

  it('is false when not in all states mode', () => {
    Config.siteMetadata = { appMode: undefined }
    expect(isAllStatesMode()).toEqual(false)
    Config.siteMetadata = { appMode: 'NJ' }
    expect(isAllStatesMode()).toEqual(false)
  })
})
