import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'
import { useDestroyEmailTemplate } from '../useDestroyEmailTemplate'
import { QUERY_KEY } from '../useEmailTemplates'
import { buildUseEmailTemplateQueryKey } from '../useEmailTemplate'
import { randomUUID } from 'crypto'

jest.mock('../../useAuthedFetch')

describe('useDestroyEmailTemplate', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('destroys an email template', async () => {
    const client = new QueryClient()
    const id = randomUUID()
    asMock(mockAuthedFetch).mockResolvedValue({
      statusCode: 200,
      json: { emailTemplate: { id } },
    })

    const { result } = renderHook(() => useDestroyEmailTemplate(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(mockAuthedFetch).not.toHaveBeenCalled()
    await result.current.mutateAsync(id)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: `/email-templates/${id}`,
      method: 'DELETE',
    })
    expect(result.current.data).toEqual({ id })
  })

  it('invalidates the useEmailTemplates and the useEmailTemplate query', async () => {
    const client = new QueryClient()
    const id = randomUUID()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { emailTemplate: { id } } })

    jest.spyOn(client, 'invalidateQueries')

    const { result } = renderHook(() => useDestroyEmailTemplate(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(client.invalidateQueries).not.toHaveBeenCalled()
    await result.current.mutateAsync(id)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(client.invalidateQueries).toHaveBeenCalledWith({ queryKey: [QUERY_KEY] })
    expect(client.invalidateQueries).toHaveBeenCalledWith({
      queryKey: [buildUseEmailTemplateQueryKey(id)],
    })
  })
})
