import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildGroupIndex, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'
import { useCreateGroup } from '../useCreateGroup'
import { QUERY_KEY } from '../useGroups'

jest.mock('../../useAuthedFetch')

describe('useCreateGroup', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('creates a group', async () => {
    const client = new QueryClient()
    const group = buildGroupIndex()
    asMock(mockAuthedFetch).mockResolvedValue({
      statusCode: 200,
      json: { group: { id: 'saved id' } },
    })

    const { result } = renderHook(() => useCreateGroup(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(mockAuthedFetch).not.toHaveBeenCalled()
    await result.current.mutateAsync(group)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: '/groups',
      method: 'POST',
      body: { group },
    })
    expect(result.current.data).toEqual({ group: { id: 'saved id' } })
  })

  it('invalidates the useGroups query', async () => {
    const client = new QueryClient()
    const group = buildGroupIndex()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { group: group } })

    jest.spyOn(client, 'invalidateQueries')

    const { result } = renderHook(() => useCreateGroup(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(client.invalidateQueries).not.toHaveBeenCalled()
    await result.current.mutateAsync(group)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(client.invalidateQueries).toHaveBeenCalledWith({ queryKey: [QUERY_KEY] })
  })
})
