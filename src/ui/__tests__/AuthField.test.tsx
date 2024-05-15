import React from 'react'
import { AuthField, AuthFieldProps } from '../AuthField'
import { RenderResult, render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('AuthField', () => {
  let label: string

  const renderAuthField = (props?: Partial<AuthFieldProps>): RenderResult => {
    return render(
      <AuthField
        inputId={faker.lorem.word()}
        label={label}
        onTextChange={jest.fn()}
        type="password"
        value={faker.lorem.word()}
        {...props}
      />,
    )
  }

  beforeEach(() => {
    label = faker.lorem.words(3)
  })

  describe('input', () => {
    it('renders a labeled input', () => {
      const value = faker.lorem.words(3)
      const { queryByLabelText } = renderAuthField({ value })
      const input: HTMLInputElement | null = queryByLabelText(label) as any
      expect(input).not.toBeNull()
      expect(input?.tagName).toEqual('INPUT')
      expect(input?.value).toEqual(value)
    })

    it('handles changes', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      const { getByLabelText } = renderAuthField({ onTextChange: handleChange, value: '' })
      const input = getByLabelText(label)
      await user.type(input, 'a')
      expect(handleChange).toHaveBeenCalledWith('a')
    })

    it('can be an email type', () => {
      const { getByLabelText } = renderAuthField({ type: 'email' })
      const input: HTMLInputElement = getByLabelText(label) as any
      expect(input.type).toEqual('email')
    })

    it('can be a password type', () => {
      const { getByLabelText } = renderAuthField({ type: 'password' })
      const input: HTMLInputElement = getByLabelText(label) as any
      expect(input.type).toEqual('password')
    })

    it('can be required', () => {
      const { getByLabelText } = renderAuthField({ required: true })
      const input: HTMLInputElement = getByLabelText(label) as any
      expect(input.required).toEqual(true)
    })

    it('can be optional', () => {
      const { getByLabelText } = renderAuthField({ required: false })
      const input: HTMLInputElement = getByLabelText(label) as any
      expect(input.required).toEqual(false)
    })

    it('can have a minLength', () => {
      const minLength = faker.number.int({ min: 3, max: 20 })
      const { getByLabelText } = renderAuthField({ minLength })
      const input: HTMLInputElement = getByLabelText(label) as any
      expect(input.minLength).toEqual(minLength)
    })
  })

  describe('description', () => {
    it('renders a description when given', () => {
      const description = faker.lorem.paragraph()
      const { getByLabelText } = renderAuthField({ description })
      const input: HTMLInputElement = getByLabelText(label) as any
      expect(input).toHaveAccessibleDescription(description)
    })

    it('renders does not render a description if none is given', () => {
      const { baseElement } = renderAuthField({ description: undefined })
      expect(baseElement.querySelector('p')).toBeNull()
    })
  })

  describe('error message', () => {
    it('renders an error message when given', () => {
      const errorMessage = faker.lorem.paragraph()
      const { getByLabelText } = renderAuthField({ error: errorMessage })
      const input: HTMLInputElement = getByLabelText(label) as any
      expect(input).toHaveAccessibleErrorMessage(errorMessage)
    })

    it('renders does not render an error message if none is given', () => {
      const { baseElement } = renderAuthField({ error: undefined })
      expect(baseElement.querySelector('p')).toBeNull()
    })
  })
})
