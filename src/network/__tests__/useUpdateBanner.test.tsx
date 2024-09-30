import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, randomBannerValue, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../useAuthedFetch'
import { useUpdateBanner } from '../useUpdateBanner'
import { QUERY_KEY } from '../useCurrentUser'

jest.mock('../useAuthedFetch')

describe('useUpdateBanner', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it("updates the user's banner", async () => {
    const client = new QueryClient()
    const banner = randomBannerValue()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { banner } })

    const { result } = renderHook(() => useUpdateBanner(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(mockAuthedFetch).not.toHaveBeenCalled()
    await result.current.mutateAsync(banner)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: '/users/banner',
      method: 'PATCH',
      body: { banner },
    })
    expect(result.current.data).toEqual(banner)
  })

  it('invalidates the useUser query', async () => {
    const client = new QueryClient()
    const banner = randomBannerValue()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { banner } })

    jest.spyOn(client, 'invalidateQueries')

    const { result } = renderHook(() => useUpdateBanner(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(client.invalidateQueries).not.toHaveBeenCalled()
    await result.current.mutateAsync(banner)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(client.invalidateQueries).toHaveBeenCalledWith({ queryKey: [QUERY_KEY] })
  })
})
