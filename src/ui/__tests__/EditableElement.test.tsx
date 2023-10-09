import { render } from '@testing-library/react'
import React from 'react'
import { EditableElement } from '../EditableElement'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('EditableElement', () => {
  let labelValue: string
  let value: string
  let initialValue: string
  let handleChange: jest.Mock

  beforeEach(() => {
    labelValue = faker.lorem.words(1)
    value = faker.lorem.words(2)
    initialValue = faker.lorem.words(3)
    handleChange = jest.fn()
  })

  it('accepts and handles changes', async () => {
    const user = userEvent.setup()
    const { baseElement } = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        initialValue={initialValue}
        element="section"
      />,
    )
    const editableElement = baseElement.querySelector('section[contenteditable]')!
    expect(editableElement).not.toBeNull()
    expect(handleChange).not.toHaveBeenCalled()
    await user.type(editableElement, 'H')
    expect(handleChange).toHaveBeenCalledWith(`${initialValue}H`)
  })

  it('displays an initial html value', () => {
    const initialValuePart1 = faker.lorem.words(3)
    const initialValuePart2 = faker.lorem.words(2)
    initialValue = [initialValuePart1, '<br />', initialValuePart2].join('')
    const { getByLabelText } = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        initialValue={initialValue}
        element="section"
      />,
    )
    const section = getByLabelText(labelValue)
    expect(section).toContainHTML(initialValue)
  })

  it('is labelled', () => {
    const { getByText } = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        initialValue={initialValue}
        element="section"
      />,
    )
    const section = getByText(initialValue)
    const attribute = section.attributes.getNamedItem('aria-label')
    expect(attribute!.value).toEqual(labelValue)
  })

  it('accepts style', () => {
    const { getByText } = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        initialValue={initialValue}
        element="section"
        style={{ backgroundColor: 'red' }}
      />,
    )
    const section = getByText(initialValue)
    expect(section.style.backgroundColor).toEqual('red')
  })

  it('is the given element', () => {
    let rendered = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        initialValue={initialValue}
        element="span"
      />,
    )
    expect(rendered.baseElement.querySelector('span')).not.toBeNull()

    rendered = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        initialValue={initialValue}
        element="section"
      />,
    )
    expect(rendered.baseElement.querySelector('section')).not.toBeNull()
  })
})
