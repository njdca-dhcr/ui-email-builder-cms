import { act, render, renderHook } from '@testing-library/react'
import React from 'react'
import { EmailPartsContent, useEmailPartsContentFor } from '../EmailPartsContent'
import { faker } from '@faker-js/faker'

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
  let id: string

  beforeEach(() => {
    id = faker.lorem.word()
  })

  it('provides the default value if there is no value for the given id', () => {
    const defaultValue = faker.lorem.paragraph()
    const { result } = renderHook(() => useEmailPartsContentFor(id, defaultValue), {
      wrapper: EmailPartsContent,
    })
    const [value] = result.current
    expect(value).toEqual(defaultValue)
  })

  it('provides the value (not the default) when there is a value', () => {
    const defaultValue = faker.lorem.paragraph()
    const newValue = faker.lorem.words(3)
    const { result, rerender } = renderHook(() => useEmailPartsContentFor(id, defaultValue), {
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
    const defaultValue = faker.lorem.paragraph()
    const appendedValue = faker.lorem.words(3)
    const { result, rerender } = renderHook(() => useEmailPartsContentFor(id, defaultValue), {
      wrapper: EmailPartsContent,
    })
    const [_value, update] = result.current
    act(() => {
      update((value) => [value, appendedValue].join(' '))
    })
    rerender()
    const [value] = result.current
    expect(value).toEqual([defaultValue, appendedValue].join(' '))
  })
})
