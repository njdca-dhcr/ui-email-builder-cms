import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { GroupShow, useGroup } from '../useGroup'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildGroupShow, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'

jest.mock('../../useAuthedFetch')

describe('useGroup', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('queries for the group with the given id', async () => {
    const client = new QueryClient()
    const group: GroupShow = buildGroupShow()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { group } })

    const { result } = renderHook(() => useGroup(group.id), {
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
      path: `/groups/${group.id}`,
      method: 'GET',
    })
    expect(result.current.data).toEqual(group)
  })
})
