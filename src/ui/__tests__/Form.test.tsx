import React from 'react'
import { Form, FormField, FormFieldProps, FormProps } from '../Form'
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
})

describe('FormField', () => {
  const renderFormField = (props: Partial<FormFieldProps>) => {
    return render(<FormField id={faker.lorem.word()} label={faker.lorem.words(3)} {...props} />)
  }

  it('has an input with a label', () => {
    const label = faker.lorem.words(3)
    const { getByLabelText } = renderFormField({ label })
    const input = getByLabelText(label)
    expect(input.nodeName).toEqual('INPUT')
  })

  it('accepts input props', () => {
    const label = faker.lorem.words(3)
    const { getByLabelText } = renderFormField({ label, required: true, type: 'email' })
    const input: HTMLInputElement = getByLabelText(label) as any
    expect(input.required).toEqual(true)
    expect(input.type).toEqual('email')
  })
})
