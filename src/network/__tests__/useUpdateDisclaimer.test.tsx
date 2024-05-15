import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, randomDisclaimerValue, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../useAuthedFetch'
import { useUpdateDisclaimer } from '../useUpdateDisclaimer'
import { QUERY_KEY } from '../useUser'

jest.mock('../useAuthedFetch')

describe('useUpdateDisclaimer', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it("updates the user's disclaimer", async () => {
    const client = new QueryClient()
    const disclaimer = randomDisclaimerValue()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { disclaimer } })

    const { result } = renderHook(() => useUpdateDisclaimer(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(mockAuthedFetch).not.toHaveBeenCalled()
    await result.current.mutateAsync(disclaimer)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: '/users/disclaimer',
      method: 'PATCH',
      body: { disclaimer },
    })
    expect(result.current.data).toEqual(disclaimer)
  })

  it('invalidates the useUser query', async () => {
    const client = new QueryClient()
    const disclaimer = randomDisclaimerValue()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { disclaimer } })

    jest.spyOn(client, 'invalidateQueries')

    const { result } = renderHook(() => useUpdateDisclaimer(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(client.invalidateQueries).not.toHaveBeenCalled()
    await result.current.mutateAsync(disclaimer)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(client.invalidateQueries).toHaveBeenCalledWith({ queryKey: [QUERY_KEY] })
  })
})
