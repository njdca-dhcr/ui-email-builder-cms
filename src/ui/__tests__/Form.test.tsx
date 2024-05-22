import React from 'react'
import {
  Form,
  FormErrorMessage,
  FormErrorMessageProps,
  FormField,
  FormFieldProps,
  FormProps,
} from '../Form'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('Form', () => {
  const renderForm = (props: Partial<FormProps>) => {
    return render(<Form onSubmit={jest.fn()} children={null} {...props} />)
  }

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = renderForm({ children: <p>{text}</p> })
    expect(baseElement).toContainHTML(`<p>${text}</p>`)
  })

  it('handles on submit and prevents the default on submit', async () => {
    const user = userEvent.setup()
    const handleSubmit: FormProps['onSubmit'] = jest.fn().mockImplementation((event) => {
      expect(event.isDefaultPrevented()).toEqual(true)
    })
    const { getByRole } = renderForm({
      children: <button type="submit">Submit</button>,
      onSubmit: handleSubmit,
    })
    expect(handleSubmit).not.toHaveBeenCalled()
    await user.click(getByRole('button'))
    expect(handleSubmit).toHaveBeenCalled()
  })

  it('is a form', () => {
    const { baseElement } = renderForm({ children: <p>{faker.lorem.sentence()}</p> })
    expect(baseElement.querySelector('form')).not.toBeNull()
  })

  it('accepts a className', () => {
    const className = faker.lorem.word()
    const { baseElement } = renderForm({ className })
    const form = baseElement.querySelector('form')
    expect(form!.className).toEqual(`form ${className}`)
  })

  describe('with an error message', () => {
    it('displays the error message', () => {
      const errorMessage = faker.lorem.sentence()
      const { queryByRole } = renderForm({ errorMessage })
      const errors = queryByRole('alert')
      expect(errors).not.toBeNull()
      expect(errors).toHaveTextContent(errorMessage)
    })
  })

  describe('without an error message', () => {
    it('does not display the errors', () => {
      const { queryByRole } = renderForm({ errorMessage: undefined })
      const errors = queryByRole('alert')
      expect(errors).toBeNull()
    })
  })
})

describe('FormField', () => {
  let label: string

  const renderFormField = (props?: Partial<FormFieldProps>) => {
    return render(<FormField id={faker.lorem.word()} label={label} {...props} />)
  }

  beforeEach(() => {
    label = faker.lorem.words(3)
  })

  describe('input', () => {
    it('renders a labeled input', () => {
      const { queryByLabelText } = renderFormField()
      const input: HTMLInputElement | null = queryByLabelText(label) as any
      expect(input).not.toBeNull()
      expect(input?.tagName).toEqual('INPUT')
    })

    it('handles changes', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      const { getByLabelText } = renderFormField({ onTextChange: handleChange, value: '' })
      const input = getByLabelText(label)
      await user.type(input, 'a')
      expect(handleChange).toHaveBeenCalledWith('a')
    })

    it('can be an email type', () => {
      const { getByLabelText } = renderFormField({ type: 'email' })
      const input: HTMLInputElement = getByLabelText(label) as any
      expect(input.type).toEqual('email')
    })

    it('can be a password type', () => {
      const { getByLabelText } = renderFormField({ type: 'password' })
      const input: HTMLInputElement = getByLabelText(label) as any
      expect(input.type).toEqual('password')
    })

    it('can be required', () => {
      const { getByLabelText } = renderFormField({ required: true })
      const input: HTMLInputElement = getByLabelText(label) as any
      expect(input.required).toEqual(true)
    })

    it('can be optional', () => {
      const { getByLabelText } = renderFormField({ required: false })
      const input: HTMLInputElement = getByLabelText(label) as any
      expect(input.required).toEqual(false)
    })

    it('can have a minLength', () => {
      const minLength = faker.number.int({ min: 3, max: 20 })
      const { getByLabelText } = renderFormField({ minLength })
      const input: HTMLInputElement = getByLabelText(label) as any
      expect(input.minLength).toEqual(minLength)
    })
  })

  describe('description', () => {
    it('renders a description when given', () => {
      const description = faker.lorem.paragraph()
      const { getByLabelText } = renderFormField({ description })
      const input: HTMLInputElement = getByLabelText(label) as any
      expect(input).toHaveAccessibleDescription(description)
    })

    it('renders does not render a description if none is given', () => {
      const { baseElement } = renderFormField({ description: undefined })
      expect(baseElement.querySelector('p')).toBeNull()
    })
  })

  describe('error message', () => {
    it('renders an error message when given', () => {
      const errorMessage = faker.lorem.paragraph()
      const { getByLabelText } = renderFormField({ error: errorMessage })
      const input: HTMLInputElement = getByLabelText(label) as any
      expect(input).toHaveAccessibleErrorMessage(errorMessage)
    })

    it('renders does not render an error message if none is given', () => {
      const { baseElement } = renderFormField({ error: undefined })
      expect(baseElement.querySelector('p')).toBeNull()
    })
  })
})

describe('FormErrorMessage', () => {
  const renderFormErrorMessage = (props: Partial<FormErrorMessageProps>) => {
    return render(<FormErrorMessage errorMessage={faker.lorem.sentence()} {...props} />)
  }

  describe('with an error message', () => {
    it('displays the error message', () => {
      const errorMessage = faker.lorem.sentence()
      const { queryByRole } = renderFormErrorMessage({ errorMessage })
      const errors = queryByRole('alert')
      expect(errors).not.toBeNull()
      expect(errors).toHaveTextContent(errorMessage)
    })
  })

  describe('without an error message', () => {
    it('does not display the errors', () => {
      const { queryByRole } = renderFormErrorMessage({ errorMessage: undefined })
      const errors = queryByRole('alert')
      expect(errors).toBeNull()
    })
  })
})
