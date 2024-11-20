import { act, render, renderHook } from '@testing-library/react'
import React, { FC, useEffect } from 'react'
import {
  EmailPartsContent,
  useEmailPartsContentData,
  useEmailPartsContentFor,
} from '../EmailPartsContent'
import { faker } from '@faker-js/faker'
import { EmailParts, TitleValue } from 'src/appTypes'
import {
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import { defaultTitleValue } from '../EmailTemplateSubComponents/Values/TitleValue'
import { EmailTemplateState, useCurrentLanguage } from 'src/utils/EmailTemplateState'
import userEvent from '@testing-library/user-event'

describe('EmailPartsContent', () => {
  const Dummy: FC = () => {
    const [data, setData] = useEmailPartsContentData()
    const [_, setCurrentLanguage] = useCurrentLanguage()

    useEffect(() => {
      setData({ foo: { bar: 'baz' } })
    }, [])

    return (
      <>
        <button
          onClick={() => {
            setCurrentLanguage('spanish')
          }}
        >
          change language
        </button>
        <span>{Object.keys(data).length > 0 ? 'full' : 'empty'}</span>
      </>
    )
  }

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailTemplateState emailTemplate={buildUniqueEmailConfig()}>
        {() => (
          <EmailPartsContent>
            <div>{text}</div>
          </EmailPartsContent>
        )}
      </EmailTemplateState>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })

  describe('when the current language changes', () => {
    it('clears its data', async () => {
      const user = userEvent.setup()
      const { baseElement, getByRole } = render(
        <EmailTemplateState
          emailTemplate={buildUniqueEmailConfig({
            translations: [
              buildEmailTranslation({ language: 'english' }),
              buildEmailTranslation({ language: 'spanish' }),
            ],
          })}
        >
          {() => (
            <EmailPartsContent>
              <Dummy />
            </EmailPartsContent>
          )}
        </EmailTemplateState>,
      )
      expect(baseElement).toHaveTextContent('full')
      expect(baseElement).not.toHaveTextContent('empty')

      await user.click(getByRole('button', { name: 'change language' }))

      expect(baseElement).not.toHaveTextContent('full')
      expect(baseElement).toHaveTextContent('empty')
    })
  })
})

describe('useEmailPartsContentFor', () => {
  let emailPart: EmailParts.Unique.Part<'Title'>

  beforeEach(() => {
    emailPart = buildUniqueEmailSubComponent({ kind: 'Title', defaultValue: {} })
  })

  it('uses the hardcoded default value if there is no value for the given id', () => {
    const { result } = renderHook(() => useEmailPartsContentFor(emailPart), {
      wrapper: EmailPartsContent,
    })
    const [value] = result.current
    expect(value).toEqual(defaultTitleValue)
  })

  it('uses the value (not the default) when there is a value', () => {
    const newValue: TitleValue = { title: faker.lorem.words(5), visible: false }
    const { result, rerender } = renderHook(() => useEmailPartsContentFor(emailPart), {
      wrapper: EmailPartsContent,
    })
    const [_value, update] = result.current
    act(() => {
      update(newValue)
    })
    rerender()
    const [value] = result.current
    expect(value).toEqual(newValue)
  })

  it('can update the value with a function', () => {
    const originalName = faker.lorem.words(2)
    emailPart.defaultValue = { title: originalName }
    const appendedValue = faker.lorem.words(3)
    const { result, rerender } = renderHook(() => useEmailPartsContentFor(emailPart), {
      wrapper: EmailPartsContent,
    })
    const [_value, update] = result.current
    act(() => {
      update((value) => {
        return { ...value, title: [value.title, appendedValue].join(' ') }
      })
    })
    rerender()
    const [value] = result.current
    expect(value.title).toEqual([originalName, appendedValue].join(' '))
  })

  it("merges the hardcoded default with the email part's defaultValue", () => {
    emailPart.defaultValue = { visible: false }
    const { result } = renderHook(() => useEmailPartsContentFor(emailPart), {
      wrapper: EmailPartsContent,
    })
    const [value] = result.current
    expect(value).toEqual({ ...defaultTitleValue, visible: false })
  })

  describe('when not given an email part', () => {
    it('returns a placeholder object and setter', async () => {
      const { result } = renderHook(() => useEmailPartsContentFor(undefined), {
        wrapper: EmailPartsContent,
      })

      const [value, setValue] = result.current
      expect(value).toEqual({})
      expect(setValue).toEqual(expect.any(Function))
    })
  })

  describe('when the email part changes', () => {
    it('resets its default value', async () => {
      const englishEmailComponent = buildUniqueEmailComponent('Name', {
        defaultValue: { name: 'english name' },
      })
      const spanishEmailComponent = {
        ...englishEmailComponent,
        defaultValue: { name: 'spanish name' },
      }
      const { result, rerender } = renderHook(
        (props: { emailComponent: EmailParts.Unique.Component }) => {
          const [value, _setValue] = useEmailPartsContentFor(props.emailComponent)
          return value
        },
        {
          initialProps: { emailComponent: englishEmailComponent },
          wrapper: ({ children }) => {
            return <EmailPartsContent>{children}</EmailPartsContent>
          },
        },
      )

      expect(result.current).toEqual(englishEmailComponent.defaultValue)
      rerender({ emailComponent: spanishEmailComponent })
      expect(result.current).toEqual(spanishEmailComponent.defaultValue)
    })
  })
})
