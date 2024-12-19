import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { AuthedFetch, useAuthedFetch } from '../useAuthedFetch'
import { asMock, userIsSignedIn } from 'src/testHelpers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { useCreateHtmlTranslationLink } from '../useCreateHtmlTranslationLink'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { Language } from 'src/appTypes'
import { currentTimestamp } from 'src/utils/currentTimestamp'

jest.mock('../useAuthedFetch')

describe('useCreateHtmlTranslationLink', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('creates an html translation link', async () => {
    const client = new QueryClient()
    const translationUrl = faker.internet.url()
    const emailTemplateId = randomUUID()
    const versionTimestamp = currentTimestamp()
    const language: Language = 'spanish'
    const htmlTranslation = `<html><body><p>${faker.lorem.sentence()}</p></body></html>`

    asMock(mockAuthedFetch).mockResolvedValue({
      statusCode: 201,
      json: { translationUrl },
    })

    const { result } = renderHook(() => useCreateHtmlTranslationLink(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(mockAuthedFetch).not.toHaveBeenCalled()
    await result.current.mutateAsync({
      emailTemplateId,
      language,
      htmlTranslation,
      versionTimestamp,
    })
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: '/html-translations-link',
      method: 'POST',
      body: { emailTemplateId, language, htmlTranslation, versionTimestamp },
    })
    expect(result.current.data).toEqual({ translationUrl })
  })
})
