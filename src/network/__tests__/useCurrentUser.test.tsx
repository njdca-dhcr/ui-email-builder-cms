import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, randomObject, userIsNotSignedIn, userIsSignedIn } from 'src/testHelpers'
import { CurrentUser, useCurrentUser } from '../useCurrentUser'
import { AuthedFetch, useAuthedFetch } from '../useAuthedFetch'

jest.mock('../useAuthedFetch')

describe('useUser', () => {
  let mockAuthedFetch: AuthedFetch

  describe('when signed in', () => {
    beforeEach(() => {
      userIsSignedIn()
      mockAuthedFetch = jest.fn()
      asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
    })

    it('queries for the user', async () => {
      const client = new QueryClient()
      const user: CurrentUser = {
        banner: randomObject(),
        departmentSeal: randomObject(),
        stateSeal: randomObject(),
        disclaimer: randomObject(),
      }
      asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { user } })
      const { result } = renderHook(() => useCurrentUser(), {
        wrapper: ({ children }) => {
          return (
            <QueryClientProvider client={client}>
              <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
          )
        },
      })
      await waitFor(() => expect(result.current.isSuccess).toEqual(true))
      expect(mockAuthedFetch).toHaveBeenCalledWith({
        path: '/users/current',
        method: 'GET',
      })
      expect(result.current.data).toEqual(user)
      expect(result.current.enabled).toEqual(true)
    })
  })

  describe('when signed out', () => {
    beforeEach(() => {
      userIsNotSignedIn()
      mockAuthedFetch = jest.fn()
      asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
    })

    it('is a disabled query', async () => {
      const client = new QueryClient()
      const { result } = renderHook(() => useCurrentUser(), {
        wrapper: ({ children }) => {
          return (
            <QueryClientProvider client={client}>
              <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
          )
        },
      })
      expect(mockAuthedFetch).not.toHaveBeenCalled()
      expect(result.current.data).toBeUndefined()
      expect(result.current.isLoading).toEqual(false)
      expect(result.current.enabled).toEqual(false)
    })
  })
})
