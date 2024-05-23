import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildUniqueEmailConfig, randomBannerValue, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../useAuthedFetch'
import { useCreateEmailTemplate } from '../useCreateEmailTemplate'
import { QUERY_KEY } from '../useEmailTemplates'

jest.mock('../useAuthedFetch')

describe('useCreateEmailTemplate', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('creates an email template', async () => {
    const client = new QueryClient()
    const emailTemplate = buildUniqueEmailConfig()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { emailTemplate } })

    const { result } = renderHook(() => useCreateEmailTemplate(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(mockAuthedFetch).not.toHaveBeenCalled()
    await result.current.mutateAsync(emailTemplate)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: '/email-templates',
      method: 'POST',
      body: { emailTemplate },
    })
    expect(result.current.data).toEqual(emailTemplate)
  })

  it('invalidates the useEmailTemplates query', async () => {
    const client = new QueryClient()
    const emailTemplate = buildUniqueEmailConfig()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { emailTemplate } })

    jest.spyOn(client, 'invalidateQueries')

    const { result } = renderHook(() => useCreateEmailTemplate(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(client.invalidateQueries).not.toHaveBeenCalled()
    await result.current.mutateAsync(emailTemplate)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(client.invalidateQueries).toHaveBeenCalledWith({ queryKey: [QUERY_KEY] })
  })
})
