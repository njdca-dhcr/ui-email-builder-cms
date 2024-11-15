import React from 'react'
import { faker } from '@faker-js/faker'
import { act, render, renderHook } from '@testing-library/react'
import { CurrentLanguage, translationForLanguage, useCurrentLanguage } from '../CurrentLanguage'
import { buildEmailTranslation, buildUniqueEmailConfig } from 'src/factories'
import { EmailTemplate } from 'src/appTypes'

describe('CurrentLanguage', () => {
  let emailTemplate: EmailTemplate.Unique.Config

  beforeEach(async () => {
    emailTemplate = buildUniqueEmailConfig({
      translations: [
        buildEmailTranslation({ language: 'english' }),
        buildEmailTranslation({ language: 'spanish' }),
      ],
    })
  })

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <CurrentLanguage emailTemplateConfig={emailTemplate}>
        {() => {
          return <div>{text}</div>
        }}
      </CurrentLanguage>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })

  it('yields its context', () => {
    render(
      <CurrentLanguage emailTemplateConfig={emailTemplate}>
        {(value) => {
          const [language, setLanguage] = value
          expect(language).toEqual('english')
          expect(setLanguage).toEqual(expect.any(Function))
          return null
        }}
      </CurrentLanguage>,
    )
  })
})

describe('useCurrentLanguage', () => {
  let emailTemplate: EmailTemplate.Unique.Config

  beforeEach(async () => {
    emailTemplate = buildUniqueEmailConfig({
      translations: [
        buildEmailTranslation({ language: 'english' }),
        buildEmailTranslation({ language: 'spanish' }),
      ],
    })
  })

  const renderCurrentLanguage = () => {
    return renderHook(() => useCurrentLanguage(), {
      wrapper: ({ children }) => {
        return (
          <CurrentLanguage emailTemplateConfig={emailTemplate}>{() => children}</CurrentLanguage>
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

describe('translationForLanguage', () => {
  it('is the current translation for the language', async () => {
    const english = buildEmailTranslation({ language: 'english' })
    const spanish = buildEmailTranslation({ language: 'spanish' })
    const emailTemplate = buildUniqueEmailConfig({
      translations: [english, spanish],
    })

    expect(translationForLanguage(emailTemplate, 'english')).toEqual(english)
    expect(translationForLanguage(emailTemplate, 'spanish')).toEqual(spanish)
  })

  it('returns an empty translation', async () => {
    const emailTemplate = buildUniqueEmailConfig({
      translations: [buildEmailTranslation({ language: 'english' })],
    })

    expect(translationForLanguage(emailTemplate, 'spanish')).toEqual({
      language: 'spanish',
      components: [],
    })
  })
})
