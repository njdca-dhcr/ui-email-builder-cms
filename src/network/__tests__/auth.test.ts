import fetchMock from 'jest-fetch-mock'
import { AuthSuccessResponse, newPasswordRequired, refreshToken, signIn } from '../auth'
import { faker } from '@faker-js/faker'
import { mockBackendUrl } from 'src/testHelpers'

describe('auth', () => {
  let mockedBackendUrl: string
  let authSuccessResponse: AuthSuccessResponse

  beforeEach(() => {
    mockedBackendUrl = faker.internet.url({ appendSlash: false })
    mockBackendUrl(mockedBackendUrl)

    authSuccessResponse = {
      kind: 'SUCCESS',
      AuthenticationResult: {
        AccessToken: faker.lorem.words(3),
        ExpiresIn: faker.number.int({ min: 1000, max: 4000 }),
        IdToken: faker.lorem.words(3),
        RefreshToken: faker.lorem.words(3),
        TokenType: 'Bearer',
      },
    }

    fetchMock.mockResponseOnce(JSON.stringify(authSuccessResponse))
  })

  describe('signIn', () => {
    it('posts the given email and password', async () => {
      const email = faker.internet.email()
      const password = faker.lorem.word()
      await signIn({ email, password })
      expect(fetchMock).toHaveBeenCalledWith(`${mockedBackendUrl}/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      })
    })

    it('returns the JSON response', async () => {
      const email = faker.internet.email()
      const password = faker.lorem.word()
      const result = await signIn({ email, password })
      expect(result).toEqual(authSuccessResponse)
    })
  })

  describe('newPasswordRequired', () => {
    it('posts the given email, password, and session', async () => {
      const email = faker.internet.email()
      const password = faker.lorem.word()
      const session = faker.lorem.paragraph()
      await newPasswordRequired({ email, password, session })
      expect(fetchMock).toHaveBeenCalledWith(`${mockedBackendUrl}/set-new-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password, session }),
      })
    })

    it('returns the JSON response', async () => {
      const email = faker.internet.email()
      const password = faker.lorem.word()
      const session = faker.lorem.paragraph()
      const result = await newPasswordRequired({ email, password, session })
      expect(result).toEqual(authSuccessResponse)
    })
  })

  describe('refreshToken', () => {
    it('posts the refresh token', async () => {
      const token = faker.lorem.paragraph()
      await refreshToken({ token })
      expect(fetchMock).toHaveBeenCalledWith(`${mockedBackendUrl}/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: token }),
      })
    })

    it('returns the JSON response', async () => {
      const token = faker.lorem.paragraph()
      const result = await refreshToken({ token })
      expect(result).toEqual(authSuccessResponse)
    })
  })
})
