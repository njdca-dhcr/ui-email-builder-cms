import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildUserShow, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'
import { useUpdateUser } from '../useUpdateUser'
import { buildUseUserQueryKey } from '../useUser'
import { USE_USERS_QUERY_KEY } from '../useUsers'
import { UserRole } from 'src/appTypes'

jest.mock('../../useAuthedFetch')

describe('useUpdateUser', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('updates the user', async () => {
    const client = new QueryClient()
    const user = buildUserShow({ role: 'member' })
    const attributes = { role: 'admin' as UserRole }
    asMock(mockAuthedFetch).mockResolvedValue({
      statusCode: 200,
      json: { user: { ...user, ...attributes } },
    })

    const { result } = renderHook(() => useUpdateUser(user.id!), {
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
      path: `/users/${user.id}`,
      method: 'PATCH',
      body: { user: attributes },
    })
    expect(result.current.data).toEqual({ user: { ...user, ...attributes } })
  })

  it('invalidates the correct useUsers and the useUser query', async () => {
    const client = new QueryClient()
    const user = buildUserShow()
    const attributes = { role: 'admin' as UserRole }
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { user } })

    jest.spyOn(client, 'invalidateQueries')

    const { result } = renderHook(() => useUpdateUser(user.id!), {
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
      queryKey: [buildUseUserQueryKey(user.id!)],
    })
    expect(client.invalidateQueries).toHaveBeenCalledWith({
      queryKey: [USE_USERS_QUERY_KEY],
    })
  })
})
