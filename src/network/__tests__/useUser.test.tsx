import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { UserShow, useUser } from '../useUser'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildUserShow, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../useAuthedFetch'

jest.mock('../useAuthedFetch')

describe('useUser', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('queries for the email template with the given id', async () => {
    const client = new QueryClient()
    const user: UserShow = buildUserShow()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { user } })

    const { result } = renderHook(() => useUser(user.id), {
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
      path: `/users/${user.id}`,
      method: 'GET',
    })
    expect(result.current.data).toEqual(user)
  })
})
