import React from 'react'
import { faker } from '@faker-js/faker'
import { act, render, renderHook } from '@testing-library/react'
import { CurrentLanguage, useCurrentLanguage, useCurrentTranslation } from '../CurrentLanguage'
import { EmailTemplateConfig } from '../EmailTemplateConfig'
import { buildEmailTranslation, buildUniqueEmailConfig } from 'src/factories'
import { EmailTranslation } from 'src/appTypes/EmailTranslation'

describe('CurrentLanguage', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailTemplateConfig
        emailTemplateConfig={buildUniqueEmailConfig({
          translations: [
            buildEmailTranslation({ language: 'english' }),
            buildEmailTranslation({ language: 'spanish' }),
          ],
        })}
      >
        <CurrentLanguage>
          <div>{text}</div>
        </CurrentLanguage>
      </EmailTemplateConfig>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })
})

describe('useCurrentLanguage', () => {
  const renderCurrentLanguage = () => {
    return renderHook(() => useCurrentLanguage(), {
      wrapper: ({ children }) => {
        return (
          <EmailTemplateConfig
            emailTemplateConfig={buildUniqueEmailConfig({
              translations: [
                buildEmailTranslation({ language: 'english' }),
                buildEmailTranslation({ language: 'spanish' }),
              ],
            })}
          >
            <CurrentLanguage>{children}</CurrentLanguage>
          </EmailTemplateConfig>
        )
      },
    })
  }

  it('is the first translation in the translations array', async () => {
    const { result } = renderCurrentLanguage()
    const [language] = result.current
    expect(language).toEqual('english')
  })

  it('can be set to another existing language', async () => {
    const { result } = renderCurrentLanguage()
    let [language, setLanguage] = result.current

    expect(language).toEqual('english')
    act(() => {
      setLanguage('spanish')
    })

    language = result.current[0]
    expect(language).toEqual('spanish')
  })
})

describe('useCurrentTranslation', () => {
  let englishTranslation: EmailTranslation.Unique
  let spanishTranslation: EmailTranslation.Unique

  beforeEach(async () => {
    englishTranslation = buildEmailTranslation({ language: 'english' })
    spanishTranslation = buildEmailTranslation({ language: 'spanish' })
  })

  const renderCurrentTranslation = () => {
    return renderHook(() => useCurrentTranslation(), {
      wrapper: ({ children }) => {
        return (
          <EmailTemplateConfig
            emailTemplateConfig={buildUniqueEmailConfig({
              translations: [englishTranslation, spanishTranslation],
            })}
          >
            <CurrentLanguage>{children}</CurrentLanguage>
          </EmailTemplateConfig>
        )
      },
    })
  }

  it('is the translation that matches the current language', async () => {
    const { result } = renderCurrentTranslation()

    expect(result.current).toEqual(englishTranslation)
  })
})
