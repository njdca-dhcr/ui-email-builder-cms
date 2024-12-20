import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { useKeepHtmlTranslationsLinksPopulated } from '../useKeepHtmlTranslationsLinksPopulated'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import {
  asMock,
  buildEmailTranslation,
  buildUniqueEmailConfig,
  buildUseQueryResult,
  buildUserShow,
  userIsSignedIn,
} from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../useAuthedFetch'
import { renderEmailTranslationToString } from 'src/templates/emailHtmlDocument/renderEmailTranslationToString'
import { faker } from '@faker-js/faker'
import { useCurrentUser } from '../users'

jest.mock('src/templates/emailHtmlDocument/renderEmailTranslationToString')
jest.mock('../useAuthedFetch')
jest.mock('../users')

describe('useKeepHtmlTranslationsLinksPopulated', () => {
  let mockAuthedFetch: AuthedFetch

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
    asMock(useCurrentUser).mockReturnValue({
      enabled: true,
      ...buildUseQueryResult({ data: buildUserShow() }),
    })
  })

  it("queries for all the the email template's translation links", async () => {
    const client = new QueryClient()
    const emailTemplate = buildUniqueEmailConfig({
      translations: [
        buildEmailTranslation({ language: 'english' }),
        buildEmailTranslation({ language: 'spanish' }),
      ],
    })
    const englishResponse = { translationUrl: faker.internet.url() }
    const spanishResponse = { translationUrl: faker.internet.url() }
    asMock(mockAuthedFetch).mockImplementation(async ({ body }) => {
      if (body.language === 'english') {
        return { statusCode: 201, json: englishResponse }
      }
      return { statusCode: 201, json: spanishResponse }
    })
    const englishMarkup = faker.lorem.words(3)
    const spanishMarkup = faker.lorem.words(4)
    asMock(renderEmailTranslationToString).mockImplementation(({ translation }) => {
      if (translation.language === 'english') {
        return englishMarkup
      }
      return spanishMarkup
    })

    const { result } = renderHook(() => useKeepHtmlTranslationsLinksPopulated(emailTemplate), {
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
      path: '/html-translations-link',
      method: 'POST',
      body: {
        emailTemplateId: emailTemplate.id!,
        language: 'english',
        htmlTranslation: englishMarkup,
        versionTimestamp: emailTemplate.versionTimestamp,
      },
    })
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: '/html-translations-link',
      method: 'POST',
      body: {
        emailTemplateId: emailTemplate.id!,
        language: 'spanish',
        htmlTranslation: spanishMarkup,
        versionTimestamp: emailTemplate.versionTimestamp,
      },
    })
    expect(result.current).toEqual({
      english: englishResponse.translationUrl,
      spanish: spanishResponse.translationUrl,
      isSuccess: true,
    })
  })
})
