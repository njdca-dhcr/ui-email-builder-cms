import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { useGroups } from '../useGroups'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildGroupIndex, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'

jest.mock('../../useAuthedFetch')

describe('useGroups', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('queries for groups', async () => {
    const client = new QueryClient()
    const groups = [buildGroupIndex(), buildGroupIndex()]
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { groups } })

    const { result } = renderHook(() => useGroups(), {
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
      path: '/groups',
      method: 'GET',
    })
    expect(result.current.data).toEqual(groups)
  })
})
