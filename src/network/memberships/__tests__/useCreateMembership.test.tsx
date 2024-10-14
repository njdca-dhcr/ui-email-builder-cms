import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildMembershipShow, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'
import { useCreateMembership } from '../useCreateMembership'
import { randomUUID } from 'crypto'
import { buildUseGroupQueryKey } from 'src/network/groups'
import { buildUseUserQueryKey } from 'src/network/useUser'

jest.mock('../../useAuthedFetch')

describe('useCreateMembership', () => {
  let mockAuthedFetch: AuthedFetch
  let userId: string
  let groupId: string

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()

    userId = randomUUID()
    groupId = randomUUID()

    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('creates a membership', async () => {
    const client = new QueryClient()

    asMock(mockAuthedFetch).mockResolvedValue({
      statusCode: 200,
      json: { membership: { id: 'saved id', userId, groupId } },
    })

    const { result } = renderHook(() => useCreateMembership(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(mockAuthedFetch).not.toHaveBeenCalled()
    await result.current.mutateAsync({ userId, groupId })
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: '/memberships',
      method: 'POST',
      body: { membership: { userId, groupId } },
    })
    expect(result.current.data).toEqual({ membership: { id: 'saved id', userId, groupId } })
  })

  it('invalidates the useGroup and useUser queries', async () => {
    const client = new QueryClient()
    const membership = buildMembershipShow()
    asMock(mockAuthedFetch).mockResolvedValue({
      statusCode: 200,
      json: { membership },
    })

    jest.spyOn(client, 'invalidateQueries')

    const { result } = renderHook(() => useCreateMembership(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(client.invalidateQueries).not.toHaveBeenCalled()
    await result.current.mutateAsync({ groupId, userId })
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(client.invalidateQueries).toHaveBeenCalledWith({
      queryKey: [buildUseUserQueryKey(membership.userId)],
    })
    expect(client.invalidateQueries).toHaveBeenCalledWith({
      queryKey: [buildUseGroupQueryKey(membership.groupId)],
    })
  })
})
