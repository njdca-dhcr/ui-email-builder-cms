import React from 'react'
import { faker } from '@faker-js/faker'
import { authedFetchJSON } from '../utils'
import { RenderHookResult, act, renderHook } from '@testing-library/react'
import { useAuthedFetch } from '../useAuthedFetch'
import { AuthProvider } from 'src/utils/AuthContext'
import {
  asMock,
  currentAuthCredentials,
  randomObject,
  userIsNotSignedIn,
  userIsSignedIn,
} from 'src/testHelpers'
import sample from 'lodash.sample'
import { refreshToken as authRefreshToken } from '../auth'

jest.mock('../utils')

jest.mock('../auth', () => {
  return {
    refreshToken: jest.fn(),
  }
})

describe('useAuthedFetch', () => {
  let renderHookResult: RenderHookResult<ReturnType<typeof useAuthedFetch>, any>

  describe('when signed in and successful', () => {
    let path: string
    let method: string
    let statusCode: number
    let body: object
    let responseJSON: object

    beforeEach(() => {
      userIsSignedIn()
      statusCode = faker.number.int({ min: 200, max: 299 })
      path = `/${faker.lorem.word()}`
      method = sample(['POST', 'patch']) as any
      body = randomObject()
      responseJSON = randomObject()
      asMock(authedFetchJSON).mockResolvedValue({ statusCode, json: responseJSON })
      renderHookResult = renderHook(() => useAuthedFetch(), {
        wrapper: ({ children }) => {
          return <AuthProvider>{children}</AuthProvider>
        },
      })
    })

    it('calls authedFetchJSON with the current auth credentials', async () => {
      expect(authedFetchJSON).not.toHaveBeenCalled()
      await renderHookResult.result.current({ path, method, body })
      expect(authedFetchJSON).toHaveBeenCalledWith(
        expect.objectContaining({
          idToken: currentAuthCredentials()?.idToken,
        }),
      )
    })

    it('passes the body, path, and method arguments through to authedFetchJSON', async () => {
      expect(authedFetchJSON).not.toHaveBeenCalled()
      await renderHookResult.result.current({ path, method, body })
      expect(authedFetchJSON).toHaveBeenCalledWith(expect.objectContaining({ path, body, method }))
    })

    it('returns the response json', async () => {
      const response = await renderHookResult.result.current({ path, method, body })
      expect(response).toEqual({ statusCode, json: responseJSON })
    })
  })

  describe('when the idToken is expired and it refreshes successfully', () => {
    let resourcePath: string
    let numberOfCalls: number
    let originalIdToken: string
    let originalRefreshToken: string
    let idToken: string
    let refreshToken: string

    beforeEach(() => {
      userIsSignedIn()
      numberOfCalls = 0
      resourcePath = `/${faker.lorem.word()}`
      originalIdToken = currentAuthCredentials()!.idToken
      originalRefreshToken = currentAuthCredentials()!.refreshToken
      idToken = faker.lorem.paragraph()
      refreshToken = faker.lorem.paragraph()

      asMock(authRefreshToken).mockResolvedValue({
        kind: 'SUCCESS',
        AuthenticationResult: {
          AccessToken: faker.lorem.paragraph(),
          IdToken: idToken,
          RefreshToken: refreshToken,
          TokenType: 'Bearer',
          ExpiresIn: 3600,
        },
      })

      asMock(authedFetchJSON).mockImplementation(async () => {
        numberOfCalls += 1
        switch (numberOfCalls) {
          case 1:
            return { statusCode: 401, json: {} }
          case 2:
            return { statusCode: 201, json: randomObject() }
          default:
            throw new Error('unexpected call')
        }
      })
      renderHookResult = renderHook(() => useAuthedFetch(), {
        wrapper: ({ children }) => {
          return <AuthProvider>{children}</AuthProvider>
        },
      })
    })

    it('refreshes the idToken', async () => {
      expect(authRefreshToken).not.toHaveBeenCalled()
      await act(async () => {
        await renderHookResult.result.current({ path: resourcePath, body: {}, method: 'POST' })
      })
      expect(authRefreshToken).toHaveBeenCalledWith({ token: originalRefreshToken })
    })

    it('updates the auth credentials', async () => {
      await act(async () => {
        await renderHookResult.result.current({ path: resourcePath, body: {}, method: 'POST' })
      })
      expect(currentAuthCredentials()).toEqual({ idToken, refreshToken })
    })

    it('reattempts the original request', async () => {
      await act(async () => {
        await renderHookResult.result.current({ path: resourcePath, body: {}, method: 'POST' })
      })
      expect(authedFetchJSON).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({ path: resourcePath, idToken: originalIdToken }),
      )
      expect(authedFetchJSON).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({ path: resourcePath, idToken }),
      )
    })

    it('returns the response to the request with the new idToken', async () => {
      const result = await act(async () => {
        return await renderHookResult.result.current({
          path: resourcePath,
          body: {},
          method: 'POST',
        })
      })
      expect(result.statusCode).toEqual(201)
    })
  })

  describe('when the idToken is expired and it fails to refresh because it is not authorized', () => {
    let unauthorizedJSON: object

    beforeEach(() => {
      userIsSignedIn()
      unauthorizedJSON = randomObject()
      asMock(authRefreshToken).mockResolvedValue({
        kind: 'NOT_AUTHORIZED',
        error: { name: 'Broken', message: 'it is broken' },
      })

      asMock(authedFetchJSON).mockImplementation(async () => {
        return { statusCode: 401, json: unauthorizedJSON }
      })
      renderHookResult = renderHook(() => useAuthedFetch(), {
        wrapper: ({ children }) => {
          return <AuthProvider>{children}</AuthProvider>
        },
      })
    })

    it('clears auth the current auth credentials', async () => {
      expect(currentAuthCredentials()).not.toBeNull()
      await act(async () => {
        return await renderHookResult.result.current({ path: '/foo', body: {}, method: 'POST' })
      })
      expect(currentAuthCredentials()).toBeNull()
    })

    it('returns the original unauthorized response', async () => {
      const result = await act(async () => {
        return await renderHookResult.result.current({ path: '/foo', body: {}, method: 'POST' })
      })
      expect(result).toEqual({ statusCode: 401, json: unauthorizedJSON })
    })
  })

  describe('when the idToken is expired and it fails to refresh because of an invalid parameter', () => {
    let unauthorizedJSON: object

    beforeEach(() => {
      userIsSignedIn()
      unauthorizedJSON = randomObject()
      asMock(authRefreshToken).mockResolvedValue({
        kind: 'INVALID_PARAMETER',
        error: { name: 'Broken', message: 'it is broken' },
      })

      asMock(authedFetchJSON).mockImplementation(async () => {
        return { statusCode: 401, json: unauthorizedJSON }
      })
      renderHookResult = renderHook(() => useAuthedFetch(), {
        wrapper: ({ children }) => {
          return <AuthProvider>{children}</AuthProvider>
        },
      })
    })

    it('clears auth the current auth credentials', async () => {
      expect(currentAuthCredentials()).not.toBeNull()
      await act(async () => {
        return await renderHookResult.result.current({ path: '/foo', body: {}, method: 'POST' })
      })
      expect(currentAuthCredentials()).toBeNull()
    })

    it('returns the original unauthorized response', async () => {
      const result = await act(async () => {
        return await renderHookResult.result.current({ path: '/foo', body: {}, method: 'POST' })
      })
      expect(result).toEqual({ statusCode: 401, json: unauthorizedJSON })
    })
  })

  describe('when not signed in', () => {
    beforeEach(() => {
      userIsNotSignedIn()
    })

    it('redirects to the sign in page', async () => {
      renderHookResult = renderHook(() => useAuthedFetch(), {
        wrapper: ({ children }) => {
          return <AuthProvider>{children}</AuthProvider>
        },
      })
      expect(async () =>
        renderHookResult.result.current({ path: '/foo', body: {}, method: 'POST' }),
      ).rejects.toThrowError('must be signed in to make that request')
    })
  })
})
