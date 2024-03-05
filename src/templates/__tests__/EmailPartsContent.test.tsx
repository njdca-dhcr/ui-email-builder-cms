import { act, render, renderHook } from '@testing-library/react'
import React from 'react'
import { EmailPartsContent, useEmailPartsContentFor } from '../EmailPartsContent'
import { faker } from '@faker-js/faker'
import { EmailTemplate, ProgramNameNJPreset, ProgramNameValue } from 'src/appTypes'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'

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
  describe('with just an id', () => {
    let id: string

    beforeEach(() => {
      id = faker.lorem.word()
    })

    it('provides the default value if there is no value for the given id', () => {
      const defaultValue = { [faker.lorem.word()]: faker.lorem.paragraph() }
      const { result } = renderHook(() => useEmailPartsContentFor(id, defaultValue), {
        wrapper: EmailPartsContent,
      })
      const [value] = result.current
      expect(value).toEqual(defaultValue)
    })

    it('provides the value (not the default) when there is a value', () => {
      const key = faker.lorem.word()
      const defaultValue = { [key]: faker.lorem.paragraph() }
      const newValue = { [key]: faker.lorem.words(3) }
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
      const key = faker.lorem.word()
      const defaultValue = { [key]: faker.lorem.paragraph() }
      const appendedValue = faker.lorem.words(3)
      const { result, rerender } = renderHook(() => useEmailPartsContentFor(id, defaultValue), {
        wrapper: EmailPartsContent,
      })
      const [_value, update] = result.current
      act(() => {
        update((value) => {
          return { ...value, [key]: [value[key], appendedValue].join(' ') }
        })
      })
      rerender()
      const [value] = result.current
      expect(value[key]).toEqual([defaultValue[key], appendedValue].join(' '))
    })
  })

  describe('with an email part', () => {
    let emailPart: EmailTemplate.UniquePart
    let defaultValue: ProgramNameValue

    beforeEach(() => {
      emailPart = buildUniqueEmailSubComponent('Header', { kind: 'ProgramName' })
      defaultValue = {
        preset: ProgramNameNJPreset.DependencyBenefits,
        name: faker.lorem.words(3),
        backgroundColor: faker.color.rgb(),
      }
    })

    it('provides the default value if there is no value for the given id', () => {
      const { result } = renderHook(() => useEmailPartsContentFor(emailPart, defaultValue), {
        wrapper: EmailPartsContent,
      })
      const [value] = result.current
      expect(value).toEqual(defaultValue)
    })

    it('provides the value (not the default) when there is a value', () => {
      const newValue: ProgramNameValue = { ...defaultValue, name: faker.lorem.words(5) }
      const { result, rerender } = renderHook(
        () => useEmailPartsContentFor(emailPart, defaultValue),
        {
          wrapper: EmailPartsContent,
        },
      )
      const [_value, update] = result.current
      act(() => {
        update(newValue)
      })
      rerender()
      const [value] = result.current
      expect(value).toEqual(newValue)
    })

    it('can update the value with a function', () => {
      const appendedValue = faker.lorem.words(3)
      const { result, rerender } = renderHook(
        () => useEmailPartsContentFor(emailPart, defaultValue),
        {
          wrapper: EmailPartsContent,
        },
      )
      const [_value, update] = result.current
      act(() => {
        update((value) => {
          return { ...value, name: [value.name, appendedValue].join(' ') }
        })
      })
      rerender()
      const [value] = result.current
      expect(value.name).toEqual([defaultValue.name, appendedValue].join(' '))
    })

    it('uses the given default when the email part lacks a defaultValue', () => {
      const { result } = renderHook(() => useEmailPartsContentFor(emailPart, defaultValue), {
        wrapper: EmailPartsContent,
      })
      const [value] = result.current
      expect(emailPart.defaultValue).toBeUndefined()
      expect(value).toEqual(defaultValue)
    })

    it('merges the given default with the email part defaultValue when there is a defaultValue', () => {
      const newName = faker.lorem.words(4)
      emailPart.defaultValue = { name: newName }
      const { result } = renderHook(() => useEmailPartsContentFor(emailPart, defaultValue), {
        wrapper: EmailPartsContent,
      })
      const [value] = result.current
      expect(value).toEqual({ ...defaultValue, name: newName })
    })
  })
})
