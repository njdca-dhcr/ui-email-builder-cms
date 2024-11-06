import React from 'react'
import { render } from '@testing-library/react'
import { PasswordInput } from '../PasswordInput'
import userEvent from '@testing-library/user-event'

describe('PasswordInput', () => {
  it('is a password input by default', async () => {
    const { baseElement } = render(<PasswordInput />)

    const input: HTMLInputElement = baseElement.querySelector('input') as any
    expect(input).not.toBeNull()
    expect(input.type).toEqual('password')
  })

  it('can be toggled to be a text input and back to a password input', async () => {
    const user = userEvent.setup()
    const { getByRole, baseElement } = render(<PasswordInput />)
    const input: HTMLInputElement = baseElement.querySelector('input') as any

    expect(input.type).toEqual('password')

    await user.click(getByRole('switch'))
    expect(input.type).toEqual('text')

    await user.click(getByRole('switch'))
    expect(input.type).toEqual('password')
  })

  it('accepts input props', async () => {
    const user = userEvent.setup()
    const onTextChange = jest.fn()
    const { baseElement } = render(<PasswordInput onTextChange={onTextChange} />)
    const input: HTMLInputElement = baseElement.querySelector('input') as any

    await user.type(input, 'a')

    expect(onTextChange).toHaveBeenCalledWith('a')
  })
})
