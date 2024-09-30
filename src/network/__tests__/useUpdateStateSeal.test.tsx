import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, randomStateSealValue, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../useAuthedFetch'
import { useUpdateStateSeal } from '../useUpdateStateSeal'
import { QUERY_KEY } from '../useCurrentUser'

jest.mock('../useAuthedFetch')

describe('useUpdateStateSeal', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it("updates the user's state seal", async () => {
    const client = new QueryClient()
    const stateSeal = randomStateSealValue()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { stateSeal } })

    const { result } = renderHook(() => useUpdateStateSeal(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(mockAuthedFetch).not.toHaveBeenCalled()
    await result.current.mutateAsync(stateSeal)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: '/users/state-seal',
      method: 'PATCH',
      body: { stateSeal },
    })
    expect(result.current.data).toEqual(stateSeal)
  })

  it('invalidates the useUser query', async () => {
    const client = new QueryClient()
    const stateSeal = randomStateSealValue()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { stateSeal } })

    jest.spyOn(client, 'invalidateQueries')

    const { result } = renderHook(() => useUpdateStateSeal(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(client.invalidateQueries).not.toHaveBeenCalled()
    await result.current.mutateAsync(stateSeal)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(client.invalidateQueries).toHaveBeenCalledWith({ queryKey: [QUERY_KEY] })
  })
})
