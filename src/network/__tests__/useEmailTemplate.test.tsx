import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { EmailTemplateShow, useEmailTemplate } from '../useEmailTemplate'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, buildUniqueEmailConfig, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../useAuthedFetch'
import { randomUUID } from 'crypto'

jest.mock('../useAuthedFetch')

describe('useEmailTemplate', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('queries for the email template with the given id', async () => {
    const client = new QueryClient()
    const emailTemplate: EmailTemplateShow = { ...buildUniqueEmailConfig(), id: randomUUID() }
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { emailTemplate } })

    const { result } = renderHook(() => useEmailTemplate(emailTemplate.id), {
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
      path: `/email-templates/${emailTemplate.id}`,
      method: 'GET',
    })
    expect(result.current.data).toEqual(emailTemplate)
  })
})
