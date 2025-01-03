import { render } from '@testing-library/react'
import React from 'react'
import { EditableElement } from '../EditableElement'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'
import { mockDataTransfer } from 'src/testHelpers'

describe('EditableElement', () => {
  let labelValue: string
  let value: string
  let handleChange: jest.Mock

  beforeEach(() => {
    labelValue = faker.lorem.words(1)
    value = faker.lorem.words(2)
    handleChange = jest.fn()
  })

  it('accepts and handles changes', async () => {
    const user = userEvent.setup()
    const { baseElement } = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        element="section"
      />,
    )
    const editableElement = baseElement.querySelector('section[contenteditable]')!
    expect(editableElement).not.toBeNull()
    expect(handleChange).not.toHaveBeenCalled()
    await user.type(editableElement, 'H')
    expect(handleChange).toHaveBeenCalledWith(`${value}H`)
  })

  it('displays an initial html value', () => {
    const valuePart1 = faker.lorem.words(3)
    const valuePart2 = faker.lorem.words(2)
    value = [valuePart1, '<br />', valuePart2].join('')
    const { getByLabelText } = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        element="section"
      />,
    )
    const section = getByLabelText(labelValue)
    expect(section).toContainHTML(value)
  })

  it('is labelled', () => {
    const { getByText } = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        element="section"
      />,
    )
    const section = getByText(value)
    const attribute = section.attributes.getNamedItem('aria-label')
    expect(attribute!.value).toEqual(labelValue)
  })

  it('accepts style', () => {
    const { getByText } = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        element="section"
        style={{ backgroundColor: 'red' }}
      />,
    )
    const section = getByText(value)
    expect(section.style.backgroundColor).toEqual('red')
  })

  it('is the given element', () => {
    let rendered = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        element="span"
      />,
    )
    expect(rendered.baseElement.querySelector('span')).not.toBeNull()

    rendered = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        element="section"
      />,
    )
    expect(rendered.baseElement.querySelector('section')).not.toBeNull()
  })

  it('pastes plain text', async () => {
    const user = userEvent.setup()
    const { baseElement } = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        element="section"
      />,
    )
    document.execCommand = jest.fn()
    const editableElement = baseElement.querySelector('section[contenteditable]')!
    await user.clear(editableElement)
    await user.click(editableElement)
    const text = faker.lorem.paragraph()
    const dataTransfer = mockDataTransfer({ plain: text, html: `<span>${text}</span>` })
    await user.paste(dataTransfer)
    expect(document.execCommand).toHaveBeenCalledWith('insertText', false, text)
  })

  it('can be read only', async () => {
    const { baseElement } = render(
      <EditableElement
        label={labelValue}
        value={value}
        onValueChange={handleChange}
        element="section"
        readOnly
      />,
    )
    expect(baseElement.querySelectorAll('[contenteditable="true"]')).toHaveLength(0)
    expect(baseElement.querySelectorAll('[readonly]')).toHaveLength(1)
  })
})
