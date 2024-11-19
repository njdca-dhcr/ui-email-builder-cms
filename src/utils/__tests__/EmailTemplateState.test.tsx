import { act, render, renderHook } from '@testing-library/react'
import React from 'react'
import {
  EmailTemplateState,
  State,
  translationForLanguage,
  useCurrentEmailTemplate,
  useCurrentLanguage,
  useCurrentTranslation,
  useOriginalEmailTemplate,
} from '../EmailTemplateState'
import { faker } from '@faker-js/faker'
import { buildEmailTranslation, buildUniqueEmailConfig } from 'src/factories'
import { EmailTemplate, EmailTranslation, Language } from 'src/appTypes'

describe('EmailTemplateState', () => {
  it('renders its children', async () => {
    const text = faker.lorem.paragraph()
    const emailTemplate = buildUniqueEmailConfig()
    const { baseElement } = render(
      <EmailTemplateState emailTemplate={emailTemplate}>
        {() => <div>{text}</div>}
      </EmailTemplateState>,
    )

    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })

  describe('when there is not email template', () => {
    const assertOnYielded = (callback: (state: State) => void) => {
      let leakedState: State | null = null
      render(
        <EmailTemplateState emailTemplate={null}>
          {(state) => {
            leakedState = state
            return null
          }}
        </EmailTemplateState>,
      )
      expect(leakedState).not.toBeNull()
      callback(leakedState!)
    }

    it('yields a placeholder original email template', async () => {
      assertOnYielded(({ originalEmailTemplate }) => {
        expect(originalEmailTemplate).toEqual({ name: '', id: '' })
      })
    })

    it('yields a placeholder current email template', async () => {
      assertOnYielded(({ currentEmailTemplate }) => {
        expect(currentEmailTemplate).toEqual({ name: '', id: '' })
      })
    })

    it('yields a placeholder current language', async () => {
      assertOnYielded(({ currentLanguage }) => {
        expect(currentLanguage).toEqual('not-set')
      })
    })

    it('yields a placeholder current translation', async () => {
      assertOnYielded(({ currentTranslation }) => {
        expect(currentTranslation).toEqual({ language: 'not-set', components: [] })
      })
    })

    it('yields a no-op setter for current email template', async () => {
      assertOnYielded(({ setCurrentEmailTemplate }) => {
        expect(setCurrentEmailTemplate).toEqual(expect.any(Function))
        expect(setCurrentEmailTemplate).not.toThrow()
      })
    })

    it('yields a no-op setter for current language', async () => {
      assertOnYielded(({ setCurrentLanguage }) => {
        expect(setCurrentLanguage).toEqual(expect.any(Function))
        expect(setCurrentLanguage).not.toThrow()
      })
    })
  })

  describe('when there is an email template', () => {
    let emailTemplate: EmailTemplate.Unique.Config
    let englishTranslation: EmailTranslation.Unique
    let spanishTranslation: EmailTranslation.Unique

    beforeEach(async () => {
      englishTranslation = buildEmailTranslation({ language: 'english' })
      spanishTranslation = buildEmailTranslation({ language: 'spanish' })
      emailTemplate = buildUniqueEmailConfig({
        translations: [englishTranslation, spanishTranslation],
      })
    })

    const assertOnYielded = (callback: (state: State) => void) => {
      let leakedState: State | null = null

      const { rerender } = render(
        <EmailTemplateState emailTemplate={null}>{() => null}</EmailTemplateState>,
      )

      rerender(
        <EmailTemplateState emailTemplate={emailTemplate}>
          {(state) => {
            leakedState = state
            return null
          }}
        </EmailTemplateState>,
      )
      expect(leakedState).not.toBeNull()
      callback(leakedState!)
    }

    it('yields the original email template', async () => {
      assertOnYielded(({ originalEmailTemplate }) => {
        expect(originalEmailTemplate).toEqual(emailTemplate)
      })
    })

    it('yields the current email template', async () => {
      assertOnYielded(({ currentEmailTemplate }) => {
        expect(currentEmailTemplate).toEqual(emailTemplate)
      })
    })

    it('yields the current language', async () => {
      assertOnYielded(({ currentLanguage }) => {
        expect(currentLanguage).toEqual(emailTemplate.translations![0].language)
      })
    })

    it('yields the current translation', async () => {
      assertOnYielded(({ currentTranslation }) => {
        expect(currentTranslation).toEqual(emailTemplate.translations![0])
      })
    })

    it('yields a setter for current email template', async () => {
      const newEmailTemplate = buildUniqueEmailConfig()

      const { rerender } = render(
        <EmailTemplateState emailTemplate={null}>{() => null}</EmailTemplateState>,
      )

      let leakedCurrentEmailTemplate: EmailTemplate.Unique.Config | null = null
      let leakedSetCurrentEmailTemplate:
        | ((emailTemplate: EmailTemplate.Unique.Config) => void)
        | null = null

      rerender(
        <EmailTemplateState emailTemplate={emailTemplate}>
          {({ setCurrentEmailTemplate, currentEmailTemplate }) => {
            leakedCurrentEmailTemplate = currentEmailTemplate
            leakedSetCurrentEmailTemplate = setCurrentEmailTemplate
            return null
          }}
        </EmailTemplateState>,
      )

      expect(leakedCurrentEmailTemplate).toEqual(emailTemplate)
      act(() => leakedSetCurrentEmailTemplate!(newEmailTemplate))
      expect(leakedCurrentEmailTemplate).toEqual(newEmailTemplate)
    })

    it('yields a setter for current language', async () => {
      const newLanguage: Language = 'spanish'

      const { rerender } = render(
        <EmailTemplateState emailTemplate={null}>{() => null}</EmailTemplateState>,
      )

      let leakedCurrentLanguage: Language | null = null
      let leakedSetCurrentLanguage: ((language: Language) => void) | null = null

      rerender(
        <EmailTemplateState emailTemplate={emailTemplate}>
          {({ setCurrentLanguage, currentLanguage }) => {
            leakedCurrentLanguage = currentLanguage
            leakedSetCurrentLanguage = setCurrentLanguage
            return null
          }}
        </EmailTemplateState>,
      )

      expect(leakedCurrentLanguage).toEqual('english')
      act(() => leakedSetCurrentLanguage!(newLanguage))
      expect(leakedCurrentLanguage).toEqual(newLanguage)
    })

    it('changing the current language changes the current translation', async () => {
      const newLanguage: Language = 'spanish'

      const { rerender } = render(
        <EmailTemplateState emailTemplate={null}>{() => null}</EmailTemplateState>,
      )

      let leakedCurrentTranslation: EmailTranslation.Unique | null = null
      let leakedSetCurrentLanguage: ((language: Language) => void) | null = null

      rerender(
        <EmailTemplateState emailTemplate={emailTemplate}>
          {({ setCurrentLanguage, currentTranslation }) => {
            leakedCurrentTranslation = currentTranslation
            leakedSetCurrentLanguage = setCurrentLanguage
            return null
          }}
        </EmailTemplateState>,
      )

      expect(leakedCurrentTranslation).toEqual(englishTranslation)
      act(() => leakedSetCurrentLanguage!(newLanguage))
      expect(leakedCurrentTranslation).toEqual(spanishTranslation)
    })
  })
})

describe('useOriginalEmailTemplate', () => {
  it('provides a placeholder email template when given null', async () => {
    const { result } = renderHook(() => useOriginalEmailTemplate(), {
      wrapper: ({ children }) => {
        return <EmailTemplateState emailTemplate={null}>{() => children}</EmailTemplateState>
      },
    })

    expect(result.current).toEqual({ name: '', id: '' })
  })

  it('provides the given email template as the original when present', async () => {
    const emailTemplate = buildUniqueEmailConfig()
    const { result } = renderHook(() => useOriginalEmailTemplate(), {
      wrapper: ({ children }) => {
        return (
          <EmailTemplateState emailTemplate={emailTemplate}>{() => children}</EmailTemplateState>
        )
      },
    })

    expect(result.current).toEqual(emailTemplate)
  })
})

describe('useCurrentEmailTemplate', () => {
  it('provides a placeholder email template when there is no email template', async () => {
    const { result } = renderHook(() => useCurrentEmailTemplate(), {
      wrapper: ({ children }) => {
        return <EmailTemplateState emailTemplate={null}>{() => children}</EmailTemplateState>
      },
    })

    expect(result.current[0]).toEqual({ name: '', id: '' })
  })

  it('provides the given email template as the original when present', async () => {
    const emailTemplate = buildUniqueEmailConfig()
    const { result } = renderHook(() => useCurrentEmailTemplate(), {
      wrapper: ({ children }) => {
        return (
          <EmailTemplateState emailTemplate={emailTemplate}>{() => children}</EmailTemplateState>
        )
      },
    })

    const [value] = result.current
    expect(value).toEqual(emailTemplate)
  })

  it('provides the updated email template once it is updated', async () => {
    const emailTemplate = buildUniqueEmailConfig()
    const { result } = renderHook(() => useCurrentEmailTemplate(), {
      wrapper: ({ children }) => {
        return (
          <EmailTemplateState emailTemplate={emailTemplate}>{() => children}</EmailTemplateState>
        )
      },
    })
    const updatedEmailTemplate = { ...emailTemplate, name: faker.lorem.word() }
    const [_value, setValue] = result.current

    act(() => {
      setValue(updatedEmailTemplate)
    })

    expect(result.current[0]).toEqual(updatedEmailTemplate)
  })
})

describe('useCurrentLanguage', () => {
  it('provides a placeholder language when there is no email template', async () => {
    const { result } = renderHook(() => useCurrentLanguage(), {
      wrapper: ({ children }) => {
        return <EmailTemplateState emailTemplate={null}>{() => children}</EmailTemplateState>
      },
    })

    expect(result.current[0]).toEqual('not-set')
  })

  it("provides the given email template's first translation's language when email template is present", async () => {
    const emailTemplate = buildUniqueEmailConfig({
      translations: [
        buildEmailTranslation({ language: 'english' }),
        buildEmailTranslation({ language: 'spanish' }),
      ],
    })
    const { result } = renderHook(() => useCurrentLanguage(), {
      wrapper: ({ children }) => {
        return (
          <EmailTemplateState emailTemplate={emailTemplate}>{() => children}</EmailTemplateState>
        )
      },
    })

    const [value] = result.current
    expect(value).toEqual('english')
  })

  it('provides the updated language once it is updated', async () => {
    const emailTemplate = buildUniqueEmailConfig({
      translations: [
        buildEmailTranslation({ language: 'english' }),
        buildEmailTranslation({ language: 'spanish' }),
      ],
    })
    const { result } = renderHook(() => useCurrentLanguage(), {
      wrapper: ({ children }) => {
        return (
          <EmailTemplateState emailTemplate={emailTemplate}>{() => children}</EmailTemplateState>
        )
      },
    })
    const [_value, setValue] = result.current

    act(() => {
      setValue('spanish')
    })

    expect(result.current[0]).toEqual('spanish')
  })
})

describe('useCurrentTranslation', () => {
  it('provides a placeholder translation when there is no email template', async () => {
    const { result } = renderHook(() => useCurrentTranslation(), {
      wrapper: ({ children }) => {
        return <EmailTemplateState emailTemplate={null}>{() => children}</EmailTemplateState>
      },
    })

    expect(result.current).toEqual({ language: 'not-set', components: [] })
  })

  it('provides the current translation based on the current language and email template', async () => {
    const translation = buildEmailTranslation({ language: 'english' })
    const emailTemplate = buildUniqueEmailConfig({
      translations: [translation, buildEmailTranslation({ language: 'spanish' })],
    })
    const { result } = renderHook(() => useCurrentTranslation(), {
      wrapper: ({ children }) => {
        return (
          <EmailTemplateState emailTemplate={emailTemplate}>{() => children}</EmailTemplateState>
        )
      },
    })

    expect(result.current).toEqual(translation)
  })

  it('provides the updated translation when the language or email template change', async () => {
    const englishTranslation = buildEmailTranslation({ language: 'english' })
    const spanishTranslation = buildEmailTranslation({ language: 'spanish' })
    const emailTemplate = buildUniqueEmailConfig({
      translations: [englishTranslation, spanishTranslation],
    })
    const { result } = renderHook(
      () => {
        return {
          setEmailTemplate: useCurrentEmailTemplate()[1],
          setLanguage: useCurrentLanguage()[1],
          translation: useCurrentTranslation(),
        }
      },
      {
        wrapper: ({ children }) => {
          return (
            <EmailTemplateState emailTemplate={emailTemplate}>{() => children}</EmailTemplateState>
          )
        },
      },
    )

    expect(result.current.translation).toEqual(englishTranslation)
    act(() => {
      result.current.setLanguage('spanish')
    })
    expect(result.current.translation).toEqual(spanishTranslation)

    const updatedSpanishTranslation = { ...spanishTranslation, previewText: faker.lorem.words(3) }
    act(() => {
      result.current.setEmailTemplate({
        ...emailTemplate,
        translations: [englishTranslation, updatedSpanishTranslation],
      })
    })
    expect(result.current.translation).toEqual(updatedSpanishTranslation)
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
