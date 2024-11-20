import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildUniqueEmailConfig, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'
import { useUpdateEmailTemplate } from '../useUpdateEmailTemplate'
import { randomUUID } from 'crypto'
import { buildUseEmailTemplateQueryKey } from '../useEmailTemplate'
import { QUERY_KEY } from '../useEmailTemplates'
import { EmailTemplate } from 'src/appTypes'

jest.mock('../../useAuthedFetch')

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

  describe('when successful', () => {
    let emailTemplate: EmailTemplate.Unique.Config
    let client: QueryClient

    beforeEach(async () => {
      emailTemplate = buildUniqueEmailConfig({ id: randomUUID() })
      client = new QueryClient()
      asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { emailTemplate } })
    })

    const renderMutation = () => {
      return renderHook(() => useUpdateEmailTemplate(emailTemplate.id!), {
        wrapper: ({ children }) => {
          return (
            <QueryClientProvider client={client}>
              <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
          )
        },
      })
    }

    it('invalidates the useEmailTemplates query', async () => {
      jest.spyOn(client, 'invalidateQueries')
      const { result } = renderMutation()

      expect(client.invalidateQueries).not.toHaveBeenCalled()
      await result.current.mutateAsync(buildUniqueEmailConfig())
      await waitFor(() => expect(result.current.isSuccess).toEqual(true))
      expect(client.invalidateQueries).toHaveBeenCalledWith(
        {
          queryKey: [QUERY_KEY],
        },
        { cancelRefetch: true },
      )
    })

    it('puts the updated email template into the cache', async () => {
      const { result } = renderMutation()
      await result.current.mutateAsync(buildUniqueEmailConfig())
      await waitFor(() => expect(result.current.isSuccess).toEqual(true))

      expect(client.getQueryData([buildUseEmailTemplateQueryKey(emailTemplate.id!)])).toEqual(
        emailTemplate,
      )
    })
  })
})
