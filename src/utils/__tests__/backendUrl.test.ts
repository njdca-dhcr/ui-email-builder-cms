import {
  mockBackendUrl,
  mockCognitoForgotPasswordUrl,
  mockCognitoSigninUrl,
  mockHtmlTranslationsCdnUrl,
} from 'src/testHelpers'
import {
  backendUrl,
  cognitoForgotPasswordUrl,
  cognitoSigninUrl,
  htmlTranslationsCdnUrl,
} from '../backendUrl'
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

describe('cognitoForgotPasswordUrl', () => {
  describe('when there is a cognito forgot password url environment variable', () => {
    it('is the given cognito forgot password url', () => {
      const url = faker.internet.url()
      mockCognitoForgotPasswordUrl(url)
      expect(cognitoForgotPasswordUrl()).toEqual(url)
    })
  })

  describe('when there is no cognito forgot password url environment variable', () => {
    it('is null', () => {
      mockCognitoForgotPasswordUrl(undefined)
      expect(cognitoForgotPasswordUrl()).toBeNull()
    })
  })
})

describe('htmlTranslationsCdnUrl', () => {
  describe('when there is an html translation cdn url environment variable', () => {
    it('is the given cognito forgot password url', () => {
      const url = faker.internet.url()
      mockHtmlTranslationsCdnUrl(url)
      expect(htmlTranslationsCdnUrl()).toEqual(url)
    })
  })

  describe('when there is not an html translation cdn url environment variable', () => {
    it('is null', () => {
      mockHtmlTranslationsCdnUrl(undefined)
      expect(htmlTranslationsCdnUrl()).toBeNull()
    })
  })
})
