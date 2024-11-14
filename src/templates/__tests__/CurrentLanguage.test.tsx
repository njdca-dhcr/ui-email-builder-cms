import React from 'react'
import { faker } from '@faker-js/faker'
import { act, render, renderHook } from '@testing-library/react'
import { CurrentLanguage, useCurrentLanguage } from '../CurrentLanguage'
import { EmailTemplateConfig } from '../EmailTemplateConfig'
import { buildEmailTranslation, buildUniqueEmailConfig } from 'src/factories'

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
