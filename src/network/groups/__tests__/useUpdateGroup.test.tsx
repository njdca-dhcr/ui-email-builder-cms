import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildGroupShow, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'
import { useUpdateGroup } from '../useUpdateGroup'
import { buildUseGroupQueryKey } from '../useGroup'
import { QUERY_KEY } from '../useGroups'

jest.mock('../../useAuthedFetch')

describe('useUpdateGroup', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('updates the group', async () => {
    const client = new QueryClient()
    const group = buildGroupShow()
    const attributes = buildGroupShow()
    asMock(mockAuthedFetch).mockResolvedValue({
      statusCode: 200,
      json: { group: { ...group, ...attributes } },
    })

    const { result } = renderHook(() => useUpdateGroup(group.id), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(mockAuthedFetch).not.toHaveBeenCalled()
    await result.current.mutateAsync(attributes)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: `/groups/${group.id}`,
      method: 'PATCH',
      body: { group: attributes },
    })
    expect(result.current.data).toEqual({ group: { ...group, ...attributes } })
  })

  it('invalidates the correct useGroups and the useGroup query', async () => {
    const client = new QueryClient()
    const group = buildGroupShow()
    const attributes = buildGroupShow()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { group } })

    jest.spyOn(client, 'invalidateQueries')

    const { result } = renderHook(() => useUpdateGroup(group.id!), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(client.invalidateQueries).not.toHaveBeenCalled()
    await result.current.mutateAsync(attributes)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(client.invalidateQueries).toHaveBeenCalledWith({
      queryKey: [buildUseGroupQueryKey(group.id!)],
    })
    expect(client.invalidateQueries).toHaveBeenCalledWith({
      queryKey: [QUERY_KEY],
    })
  })
})
