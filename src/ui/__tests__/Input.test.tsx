import { render } from '@testing-library/react'
import React from 'react'
import { Input } from '../Input'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('Input', () => {
  it('accepts a value', () => {
    const value = faker.lorem.paragraph()
    const { getByRole } = render(<Input value={value} onTextChange={jest.fn()} />)
    expect(getByRole('textbox')).toHaveValue(value)
  })

  it('handles changes', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { getByRole } = render(<Input value={''} onTextChange={handleChange} />)
    await user.type(getByRole('textbox'), 'a')
    expect(handleChange).toHaveBeenCalledWith('a')
  })

  it('accepts input element props', () => {
    const value = faker.lorem.paragraph()
    const id = faker.lorem.word()
    const { getByRole } = render(
      <Input value={value} id={id} type="url" onTextChange={jest.fn()} />,
    )
    const input = getByRole('textbox')
    expect(input.id).toEqual(id)
    expect(input.attributes.getNamedItem('type')?.value).toEqual('url')
  })

  it('accepts className', () => {
    const { baseElement } = render(
      <Input value={''} className="my-class" onTextChange={jest.fn()} />,
    )
    expect(baseElement.querySelector('input.input.my-class')).not.toBeNull()
  })
})
