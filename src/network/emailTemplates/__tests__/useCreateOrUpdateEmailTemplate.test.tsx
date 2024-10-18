import React from 'react'
import { AuthedFetch, useAuthedFetch } from '../../useAuthedFetch'
import { asMock, buildUniqueEmailConfig, userIsSignedIn } from 'src/testHelpers'
import { useCreateOrUpdateEmailTemplate } from '../useCreateOrUpdateEmailTemplate'
import { randomUUID } from 'crypto'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'

jest.mock('../../useAuthedFetch')

describe('useCreateOrUpdateEmailTemplate', () => {
  let mockAuthedFetch: AuthedFetch
  let id: string

  beforeEach(() => {
    userIsSignedIn()
    id = randomUUID()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
    asMock(mockAuthedFetch).mockResolvedValue({
      statusCode: 200,
      json: { emailTemplate: { id } },
    })
  })

  describe('when the given id is present', () => {
    it('updates the email template', async () => {
      const client = new QueryClient()
      const emailTemplate = buildUniqueEmailConfig({ id })
      const attributes = buildUniqueEmailConfig()
      const { result } = renderHook(() => useCreateOrUpdateEmailTemplate(id), {
        wrapper: ({ children }) => {
          return (
            <QueryClientProvider client={client}>
              <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
          )
        },
      })
      await result.current.mutateAsync(attributes)
      await waitFor(() => expect(result.current.isSuccess).toEqual(true))
      expect(mockAuthedFetch).toHaveBeenCalledWith({
        path: `/email-templates/${emailTemplate.id}`,
        method: 'PATCH',
        body: { emailTemplate: attributes },
      })
    })
  })

  describe('when the given id is undefined', () => {
    it('creates an email template', async () => {
      const client = new QueryClient()
      const emailTemplate = buildUniqueEmailConfig()
      const { result } = renderHook(() => useCreateOrUpdateEmailTemplate(undefined), {
        wrapper: ({ children }) => {
          return (
            <QueryClientProvider client={client}>
              <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
          )
        },
      })
      await result.current.mutateAsync(emailTemplate)
      await waitFor(() => expect(result.current.isSuccess).toEqual(true))
      expect(mockAuthedFetch).toHaveBeenCalledWith({
        path: `/email-templates`,
        method: 'POST',
        body: { emailTemplate },
      })
    })
  })
})
