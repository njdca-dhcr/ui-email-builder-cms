import { render } from '@testing-library/react'
import React from 'react'
import { RichTextEditor } from '..'
import { faker } from '@faker-js/faker'

describe('RichTextEditor', () => {
  it('displays the rich text', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <RichTextEditor
        onValueChange={jest.fn()}
        value={[{ type: 'paragraph', children: [{ text, bold: true }] }]}
      />,
    )
    expect(baseElement.querySelector('strong')).not.toBeNull()
    expect(baseElement).toHaveTextContent(text)
  })

  it('displays the toolbar', () => {
    const { baseElement } = render(
      <RichTextEditor
        onValueChange={jest.fn()}
        value={[{ type: 'paragraph', children: [{ text: 'text', bold: true }] }]}
      />,
    )
    expect(baseElement.querySelector('.rte-toolbar')).not.toBeNull()
  })
})
