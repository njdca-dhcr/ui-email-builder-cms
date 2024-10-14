import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildMembershipShow, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'
import { useDestroyMembership } from '../useDestroyMembership'
import { buildUseUserQueryKey } from 'src/network/useUser'
import { buildUseGroupQueryKey } from 'src/network/groups'

jest.mock('../../useAuthedFetch')

describe('useDestroyMembership', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('destroys the membership', async () => {
    const client = new QueryClient()
    const membership = buildMembershipShow()
    asMock(mockAuthedFetch).mockResolvedValue({
      statusCode: 200,
      json: { membership: { id: membership.id } },
    })

    const { result } = renderHook(() => useDestroyMembership(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(mockAuthedFetch).not.toHaveBeenCalled()
    await result.current.mutateAsync(membership)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: `/memberships/${membership.id}`,
      method: 'DELETE',
    })
    expect(result.current.data).toEqual({ membership: { id: membership.id } })
  })

  it('invalidates the useGroup and useUser queries', async () => {
    const client = new QueryClient()
    const membership = buildMembershipShow()
    asMock(mockAuthedFetch).mockResolvedValue({
      statusCode: 200,
      json: { membership: { id: membership.id } },
    })

    jest.spyOn(client, 'invalidateQueries')

    const { result } = renderHook(() => useDestroyMembership(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(client.invalidateQueries).not.toHaveBeenCalled()
    await result.current.mutateAsync(membership)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(client.invalidateQueries).toHaveBeenCalledWith({
      queryKey: [buildUseUserQueryKey(membership.userId)],
    })
    expect(client.invalidateQueries).toHaveBeenCalledWith({
      queryKey: [buildUseGroupQueryKey(membership.groupId)],
    })
  })
})
