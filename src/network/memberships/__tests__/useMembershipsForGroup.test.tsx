import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMembershipsForGroup } from '../useMembershipsForGroup'
import { AuthProvider } from 'src/utils/AuthContext'
import {
  asMock,
  buildMembershipShow,
  buildUserMembershipIndex,
  userIsSignedIn,
} from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'

jest.mock('../../useAuthedFetch')

describe('useMembershipsForGroup', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('queries for user memberships', async () => {
    const client = new QueryClient()
    const membership = buildMembershipShow()
    const users = [buildUserMembershipIndex(), buildUserMembershipIndex()]
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { users } })

    const { result } = renderHook(() => useMembershipsForGroup(membership.id), {
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
      path: `/groups/${membership.id}/memberships`,
      method: 'GET',
    })
    expect(result.current.data).toEqual(users)
  })
})
