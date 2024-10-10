import { render } from '@testing-library/react'
import React from 'react'
import { Textarea } from '../Textarea'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('Textarea', () => {
  it('accepts a value', () => {
    const value = faker.lorem.paragraph()
    const { getByRole } = render(<Textarea value={value} onTextChange={jest.fn()} />)
    expect(getByRole('textbox')).toHaveValue(value)
  })

  it('handles changes', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { getByRole } = render(<Textarea value={''} onTextChange={handleChange} />)
    await user.type(getByRole('textbox'), 'a')
    expect(handleChange).toHaveBeenCalledWith('a')
  })

  it('can be uncontrolled', async () => {
    const user = userEvent.setup()
    const value = faker.lorem.words(3)
    const { getByRole } = render(<Textarea />)
    const textarea: HTMLTextAreaElement = getByRole('textbox') as any
    await expect(user.type(textarea, value)).resolves.not.toThrowError()
    expect(textarea.value).toEqual(value)
  })

  it('accepts textarea element props', () => {
    const value = faker.lorem.paragraph()
    const id = faker.lorem.word()
    const { getByRole } = render(
      <Textarea value={value} id={id} rows={4} onTextChange={jest.fn()} />,
    )
    const textarea = getByRole('textbox')
    expect(textarea.id).toEqual(id)
    expect(textarea.attributes.getNamedItem('rows')?.value).toEqual('4')
  })

  it('has 3 rows by default', () => {
    const id = faker.lorem.word()
    const { getByRole } = render(<Textarea id={id} />)
    const textarea = getByRole('textbox')
    expect(textarea.id).toEqual(id)
    expect(textarea.attributes.getNamedItem('rows')?.value).toEqual('3')
  })

  it('accepts className', () => {
    const { baseElement } = render(
      <Textarea value={''} className="my-class" onTextChange={jest.fn()} />,
    )
    expect(baseElement.querySelector('textarea.textarea.my-class')).not.toBeNull()
  })
})
