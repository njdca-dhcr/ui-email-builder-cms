import { mockBackendUrl, mockCognitoSigninUrl } from 'src/testHelpers'
import { backendUrl, cognitoSigninUrl } from '../backendUrl'
import { faker } from '@faker-js/faker'

describe('backendUrl', () => {
  describe('when there is a backend url environment variable', () => {
    it('is the given backend url', () => {
      const url = faker.internet.url()
      mockBackendUrl(url)
      expect(backendUrl()).toEqual(url)
    })
  })

  describe('when there is no a backend url environment variable', () => {
    it('is null', () => {
      mockBackendUrl(undefined)
      expect(backendUrl()).toBeNull()
    })
  })
})

describe('cognitoSigninUrl', () => {
  describe('when there is a cognito signin url environment variable', () => {
    it('is the given cognito signin url', () => {
      const url = faker.internet.url()
      mockCognitoSigninUrl(url)
      expect(cognitoSigninUrl()).toEqual(url)
    })
  })

  describe('when there is no a cognito signin url environment variable', () => {
    it('is null', () => {
      mockCognitoSigninUrl(undefined)
      expect(cognitoSigninUrl()).toBeNull()
    })
  })
})
