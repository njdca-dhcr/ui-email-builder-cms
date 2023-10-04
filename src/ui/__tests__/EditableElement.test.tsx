import { render } from '@testing-library/react'
import React from 'react'
import { EditableElement } from '../EditableElement'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('EditableElement', () => {
  let labelValue: string
  let value: string
  let defaultValue: string
  let handleChange: jest.Mock

  beforeEach(() => {
    labelValue = faker.lorem.words(1)
    value = faker.lorem.words(2)
    defaultValue = faker.lorem.words(3)
    handleChange = jest.fn()
  })

  it('accepts and handles changes', async () => {
    const user = userEvent.setup()
    const { baseElement } = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        initialValue={defaultValue}
        element="section"
      />,
    )
    const editableElement = baseElement.querySelector('section[contenteditable]')!
    expect(editableElement).not.toBeNull()
    expect(handleChange).not.toHaveBeenCalled()
    await user.type(editableElement, 'H')
    expect(handleChange).toHaveBeenCalledWith(`${defaultValue}H`)
  })

  it('displays a default value', () => {
    const { getByText } = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        initialValue={defaultValue}
        element="section"
      />,
    )
    const section = getByText(defaultValue)
    expect(section.tagName).toEqual('SECTION')
  })

  it('is labelled', () => {
    const { getByText } = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        initialValue={defaultValue}
        element="section"
      />,
    )
    const section = getByText(defaultValue)
    const attribute = section.attributes.getNamedItem('aria-label')
    expect(attribute!.value).toEqual(labelValue)
  })

  it('accepts style', () => {
    const { getByText } = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        initialValue={defaultValue}
        element="section"
        style={{ backgroundColor: 'red' }}
      />,
    )
    const section = getByText(defaultValue)
    expect(section.style.backgroundColor).toEqual('red')
  })

  it('is the given element', () => {
    let rendered = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        initialValue={defaultValue}
        element="span"
      />,
    )
    expect(rendered.baseElement.querySelector('span')).not.toBeNull()

    rendered = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        initialValue={defaultValue}
        element="section"
      />,
    )
    expect(rendered.baseElement.querySelector('section')).not.toBeNull()
  })
})
