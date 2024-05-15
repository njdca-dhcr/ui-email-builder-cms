import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, randomDepartmentSealValue, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../useAuthedFetch'
import { useUpdateDepartmentSeal } from '../useUpdateDepartmentSeal'
import { QUERY_KEY } from '../useUser'

jest.mock('../useAuthedFetch')

describe('useUpdateDepartmentSeal', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it("updates the user's department seal", async () => {
    const client = new QueryClient()
    const departmentSeal = randomDepartmentSealValue()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { departmentSeal } })

    const { result } = renderHook(() => useUpdateDepartmentSeal(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(mockAuthedFetch).not.toHaveBeenCalled()
    await result.current.mutateAsync(departmentSeal)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: '/users/department-seal',
      method: 'PATCH',
      body: { departmentSeal },
    })
    expect(result.current.data).toEqual(departmentSeal)
  })

  it('invalidates the useUser query', async () => {
    const client = new QueryClient()
    const departmentSeal = randomDepartmentSealValue()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { departmentSeal } })

    jest.spyOn(client, 'invalidateQueries')

    const { result } = renderHook(() => useUpdateDepartmentSeal(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(client.invalidateQueries).not.toHaveBeenCalled()
    await result.current.mutateAsync(departmentSeal)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(client.invalidateQueries).toHaveBeenCalledWith({ queryKey: [QUERY_KEY] })
  })
})
