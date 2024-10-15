import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { MembershipShow, useMembership } from '../useMembership'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildMembershipShow, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'

jest.mock('../../useAuthedFetch')

describe('useMembership', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('queries for the group with the given id', async () => {
    const client = new QueryClient()
    const membership: MembershipShow = buildMembershipShow()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { membership } })

    const { result } = renderHook(() => useMembership(membership.id), {
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
      path: `/membership/${membership.id}`,
      method: 'GET',
    })
    expect(result.current.data).toEqual(membership)
  })
})
