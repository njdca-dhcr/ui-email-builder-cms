import React, { useState } from 'react'
import { render } from '@testing-library/react'
import { InlineTextArea } from '../InlineTextArea'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('InlineTextArea', () => {
  it('displays a text area', () => {
    const label = faker.lorem.words(3)
    const value = faker.lorem.paragraph()
    const { getByLabelText } = render(
      <InlineTextArea value={value} onChange={jest.fn()} label={label} />,
    )

    const textarea: HTMLTextAreaElement = getByLabelText(label) as any
    expect(textarea.tagName).toEqual('TEXTAREA')
    expect(textarea.value).toEqual(value)
  })

  it('handles changes', async () => {
    const user = userEvent.setup()
    const label = faker.lorem.words(3)
    const handleChange = jest.fn()
    const value = 'a'

    const { getByLabelText } = render(
      <InlineTextArea value={''} onChange={handleChange} label={label} />,
    )

    const textarea: HTMLTextAreaElement = getByLabelText(label) as any

    expect(handleChange).not.toHaveBeenCalled()
    await user.type(textarea, value)
    expect(handleChange).toHaveBeenCalledWith(value)
  })
})
