import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useMemberships } from '../useMemberships'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildMembershipIndex, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'

jest.mock('../../useAuthedFetch')

describe('useMemberships', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('queries for memberships', async () => {
    const client = new QueryClient()
    const memberships = [buildMembershipIndex(), buildMembershipIndex()]
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { memberships } })

    const { result } = renderHook(() => useMemberships(), {
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
      path: '/memberships',
      method: 'GET',
    })
    expect(result.current.data).toEqual(memberships)
  })
})
