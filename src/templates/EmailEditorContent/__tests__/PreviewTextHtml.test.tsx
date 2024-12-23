import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import { PreviewTextHtml } from '../PreviewTextHtml'

describe('PreviewTextHtml', () => {
  it('displays the given preview text', () => {
    const value = faker.lorem.paragraph()
    const { baseElement } = render(<PreviewTextHtml value={value} />)

    const element = baseElement.querySelector('#preview-text')
    expect(element).not.toBeNull()
    expect(element).toHaveTextContent(value)
  })

  it('is display: none', () => {
    const value = faker.lorem.paragraph()
    const { baseElement } = render(<PreviewTextHtml value={value} />)

    const element = baseElement.querySelector('#preview-text')
    expect(element).not.toBeNull()
    const attribute = element!.attributes.getNamedItem('style')
    expect(attribute?.value).toEqual('display: none;')
  })
})
