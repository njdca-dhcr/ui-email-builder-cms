import { faker } from '@faker-js/faker'
import { buildSiteUrl, siteUrl } from '../siteUrl'
import Config from '../../../gatsby-config'

jest.mock('../../../gatsby-config', () => {
  return {
    sideMetadata: {
      env: 'development',
      appMode: 'NJ',
    },
  }
})

describe('siteUrl', () => {
  describe('when in development', () => {
    it('is the configured siteUrl for development', () => {
      Config.siteMetadata = { env: 'development', appMode: 'NJ' }
      expect(siteUrl()).toEqual('http://localhost:8000')
    })
  })

  describe('when in production and NJ mode', () => {
    it('is the configured siteUrl for New Jersey', () => {
      Config.siteMetadata = { env: 'production', appMode: 'NJ' }
      expect(siteUrl()).toEqual('https://main.dor49a0hhc0bh.amplifyapp.com')
    })
  })

  describe('when in production and all states mode', () => {
    it('is the configured siteUrl for all states', () => {
      Config.siteMetadata = { env: 'production', appMode: 'ALL' }
      expect(siteUrl()).toEqual('TBD')
    })
  })

  describe('when in production and the mode is not specified', () => {
    it('is the configured siteUrl for New Jersey', () => {
      Config.siteMetadata = { env: 'production', appMode: undefined }
      expect(siteUrl()).toEqual('https://main.dor49a0hhc0bh.amplifyapp.com')
    })
  })
})

describe('buildSiteUrl', () => {
  it('is the site url with the given path appended', () => {
    const path = `/${faker.lorem.word()}/${faker.lorem.word()}`

    Config.siteMetadata = { env: 'production', appMode: 'NJ' }
    expect(buildSiteUrl(path)).toEqual(`https://main.dor49a0hhc0bh.amplifyapp.com${path}`)

    Config.siteMetadata = { env: 'development', appMode: 'NJ' }
    expect(buildSiteUrl(path)).toEqual(`http://localhost:8000${path}`)
  })
})
