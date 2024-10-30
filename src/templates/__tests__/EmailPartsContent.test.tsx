import { act, render, renderHook } from '@testing-library/react'
import React from 'react'
import { EmailPartsContent, useEmailPartsContentFor } from '../EmailPartsContent'
import { faker } from '@faker-js/faker'
import { EmailTemplate, TitleValue } from 'src/appTypes'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'
import { defaultTitleValue } from '../EmailTemplateSubComponents/Values/TitleValue'

describe('EmailPartsContent', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailPartsContent>
        <div>{text}</div>
      </EmailPartsContent>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })
})

describe('useEmailPartsContentFor', () => {
  let emailPart: EmailTemplate.Unique.Part<'Title'>

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
})
