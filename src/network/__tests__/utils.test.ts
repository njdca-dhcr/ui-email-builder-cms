import { faker } from '@faker-js/faker'
import fetchMock from 'jest-fetch-mock'
import { mockBackendUrl } from 'src/testHelpers'
import { authedFetchJSON } from '../utils'

describe('network utils', () => {
  let mockedBackendUrl: string

  beforeEach(() => {
    mockedBackendUrl = faker.internet.url({ appendSlash: false })
    mockBackendUrl(mockedBackendUrl)
  })

  describe('authedFetchJSON', () => {
    let idToken: string
    let responseJSON: { [key: string]: string }

    beforeEach(() => {
      idToken = faker.lorem.paragraph()
      responseJSON = { [faker.lorem.word()]: faker.lorem.word() }
      fetchMock.mockResponseOnce(JSON.stringify(responseJSON))
    })

    describe('a GET request', () => {
      it('makes a request to the backend given path, method, and body', async () => {
        const body = undefined
        const path = `/${faker.lorem.word()}`
        const method = 'get'

        await authedFetchJSON({ idToken, body, path, method })

        expect(fetchMock).toHaveBeenCalledWith(
          `${mockedBackendUrl}${path}`,
          expect.objectContaining({
            method,
            body: JSON.stringify(body),
          }),
        )
      })

      it('makes the request with the proper authorization header', async () => {
        await authedFetchJSON({ idToken, path: '/foo', method: 'GET' })

        expect(fetchMock).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }),
        )
      })
    })

    describe('non GET requests', () => {
      it('makes a request to the backend given path, method, and body', async () => {
        const body = { [faker.lorem.word()]: faker.lorem.word() }
        const path = `/${faker.lorem.word()}`
        const method = 'post'

        await authedFetchJSON({ idToken, body, path, method })

        expect(fetchMock).toHaveBeenCalledWith(
          `${mockedBackendUrl}${path}`,
          expect.objectContaining({
            method,
            body: JSON.stringify(body),
          }),
        )
      })

      it('makes the request with the proper authorization header', async () => {
        await authedFetchJSON({ idToken, body: {}, path: '/foo', method: 'POST' })

        expect(fetchMock).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            headers: {
              Authorization: `Bearer ${idToken}`,
              'Content-Type': 'application/json',
            },
          }),
        )
      })
    })

    it('returns the response', async () => {
      const result = await authedFetchJSON({ idToken, body: {}, path: '/bar', method: 'post' })
      expect(result).toEqual({ statusCode: 200, json: responseJSON })
    })
  })
})
