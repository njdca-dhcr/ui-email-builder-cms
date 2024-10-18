import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'
import { useDestroyUser } from '../useDestroyUser'
import { USER_USERS_QUERY_KEY } from '../useUsers'
import { buildUseUserQueryKey } from '../useUser'
import { randomUUID } from 'crypto'

jest.mock('../../useAuthedFetch')

describe('useDestroyUser', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('destroys the user', async () => {
    const client = new QueryClient()
    const id = randomUUID()
    asMock(mockAuthedFetch).mockResolvedValue({
      statusCode: 200,
      json: { user: { id } },
    })

    const { result } = renderHook(() => useDestroyUser(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(mockAuthedFetch).not.toHaveBeenCalled()
    await result.current.mutateAsync(id)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: `/users/${id}`,
      method: 'DELETE',
    })
    expect(result.current.data).toEqual({ id })
  })

  it('invalidates the useUsers and the useUser query', async () => {
    const client = new QueryClient()
    const id = randomUUID()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { user: { id } } })

    jest.spyOn(client, 'invalidateQueries')

    const { result } = renderHook(() => useDestroyUser(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(client.invalidateQueries).not.toHaveBeenCalled()
    await result.current.mutateAsync(id)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(client.invalidateQueries).toHaveBeenCalledWith({ queryKey: [USER_USERS_QUERY_KEY] })
    expect(client.invalidateQueries).toHaveBeenCalledWith({ queryKey: [buildUseUserQueryKey(id)] })
  })
})
