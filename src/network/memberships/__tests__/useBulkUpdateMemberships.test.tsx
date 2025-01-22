import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'
import { useBulkUpdateMemberships } from '../useBulkUpdateMemberships'
import { randomUUID } from 'crypto'
import { buildUseGroupQueryKey, QUERY_KEY as useGroupsQueryKey } from 'src/network/groups'

jest.mock('../../useAuthedFetch')

describe('useBulkUpdateMemberships', () => {
  let mockAuthedFetch: AuthedFetch
  let userIdsToAdd: string[]
  let membershipIdsToDelete: string[]
  let groupId: string

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()

    userIdsToAdd = [randomUUID(), randomUUID()]
    membershipIdsToDelete = [randomUUID(), randomUUID()]

    groupId = randomUUID()

    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('creates a deletes memberships', async () => {
    const client = new QueryClient()

    asMock(mockAuthedFetch).mockResolvedValue({
      statusCode: 200,
      json: {},
    })

    const { result } = renderHook(() => useBulkUpdateMemberships(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(mockAuthedFetch).not.toHaveBeenCalled()
    await result.current.mutateAsync({ userIdsToAdd, membershipIdsToDelete, groupId })
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))

    userIdsToAdd.forEach((userId) => {
      expect(mockAuthedFetch).toHaveBeenCalledWith({
        path: '/memberships',
        method: 'POST',
        body: { membership: { userId, groupId } },
      })
    })

    membershipIdsToDelete.forEach((membershipId) => {
      expect(mockAuthedFetch).toHaveBeenCalledWith({
        path: `/memberships/${membershipId}`,
        method: 'DELETE',
      })
    })
  })

  it('invalidates the useGroup, useGroups, and useUser queries', async () => {
    const client = new QueryClient()
    asMock(mockAuthedFetch).mockResolvedValue({
      statusCode: 200,
      json: {},
    })

    jest.spyOn(client, 'invalidateQueries')

    const { result } = renderHook(() => useBulkUpdateMemberships(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(client.invalidateQueries).not.toHaveBeenCalled()
    await result.current.mutateAsync({ userIdsToAdd, membershipIdsToDelete, groupId })
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(client.invalidateQueries).toHaveBeenCalledWith({
      queryKey: [buildUseGroupQueryKey(groupId)],
    })
    expect(client.invalidateQueries).toHaveBeenCalledWith({
      queryKey: [useGroupsQueryKey],
    })
  })
})
