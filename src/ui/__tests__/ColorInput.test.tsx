import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React, { FC, ReactElement, useState } from 'react'
import { ColorInput } from '../ColorInput'
import { userEvent } from '@testing-library/user-event'

describe('ColorInput', () => {
  it('has a text input for a hex code', () => {
    // the faker method is rgb but it returns a hex value
    const color = faker.color.rgb()
    const inputId = faker.lorem.word()
    const { baseElement } = render(<ColorInput value={color} onChange={jest.fn()} id={inputId} />)
    const input: HTMLInputElement | null = baseElement.querySelector('input[type="text"]') as any
    expect(input).not.toBeNull()
    expect(input?.value).toEqual(color)
    expect(input?.type).toEqual('text')
    expect(input?.id).toEqual(inputId)
  })

  it('accepts a className', () => {
    const { baseElement } = render(
      <ColorInput
        value={faker.color.rgb()}
        onChange={jest.fn()}
        id={faker.lorem.word()}
        className="my-class"
      />,
    )
    const container = baseElement.querySelector('.my-class')
    expect(container).not.toBeNull()
  })

  const DummyState: FC<{
    initialValue: string
    children: (value: string, setValue: (value: string) => void) => ReactElement
  }> = ({ initialValue, children }) => {
    const [value, setValue] = useState(initialValue)
    return children(value, setValue)
  }

  it('handles changes when valid', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const color = faker.color.rgb()
    const { getByRole } = render(
      <DummyState initialValue="">
        {(value, setValue) => {
          handleChange.mockImplementation(setValue)
          return <ColorInput value={value} onChange={handleChange} id={faker.lorem.word()} />
        }}
      </DummyState>,
    )
    expect(handleChange).not.toHaveBeenCalled()
    await user.type(getByRole('textbox'), color)
    expect(handleChange).toHaveBeenCalledWith(color)
  })

  it('does not handle changes when invalid', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const invalidColor = '#q'
    const { getByRole } = render(
      <DummyState initialValue="">
        {(value, setValue) => {
          handleChange.mockImplementation(setValue)
          return <ColorInput value={value} onChange={handleChange} id={faker.lorem.word()} />
        }}
      </DummyState>,
    )
    expect(handleChange).not.toHaveBeenCalled()
    await user.type(getByRole('textbox'), invalidColor)
    expect(handleChange).not.toHaveBeenCalled()
  })
})
