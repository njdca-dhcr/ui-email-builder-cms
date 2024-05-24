import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildUniqueEmailConfig, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../useAuthedFetch'
import { useUpdateEmailTemplate } from '../useUpdateEmailTemplate'
import { randomUUID } from 'crypto'
import { buildUseEmailTemplateQueryKey } from '../useEmailTemplate'
import { QUERY_KEY } from '../useEmailTemplates'

jest.mock('../useAuthedFetch')

describe('useUpdateEmailTemplate', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('updates the email template', async () => {
    const client = new QueryClient()
    const emailTemplate = buildUniqueEmailConfig({ id: randomUUID() })
    const attributes = buildUniqueEmailConfig()
    asMock(mockAuthedFetch).mockResolvedValue({
      statusCode: 200,
      json: { emailTemplate: { ...emailTemplate, ...attributes } },
    })

    const { result } = renderHook(() => useUpdateEmailTemplate(emailTemplate.id!), {
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
      path: `/email-templates/${emailTemplate.id}`,
      method: 'PATCH',
      body: { emailTemplate: attributes },
    })
    expect(result.current.data).toEqual({ emailTemplate: { ...emailTemplate, ...attributes } })
  })

  it('invalidates the correct useEmailTemplate query', async () => {
    const client = new QueryClient()
    const emailTemplate = buildUniqueEmailConfig({ id: randomUUID() })
    const attributes = buildUniqueEmailConfig()
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { emailTemplate } })

    jest.spyOn(client, 'invalidateQueries')

    const { result } = renderHook(() => useUpdateEmailTemplate(emailTemplate.id!), {
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
      queryKey: [buildUseEmailTemplateQueryKey(emailTemplate.id!)],
    })
    expect(client.invalidateQueries).toHaveBeenCalledWith({
      queryKey: [QUERY_KEY],
    })
  })
})
