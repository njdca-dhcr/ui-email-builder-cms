import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React from 'react'
import { PreviewText } from 'src/templates/PreviewText'
import { PreviewTextHtml } from '../PreviewTextHtml'

describe('PreviewTextHtml', () => {
  it('displays the text in the preview text context', () => {
    const value = faker.lorem.paragraph()
    const { baseElement } = render(
      <PreviewText initialValue={value}>
        <PreviewTextHtml />
      </PreviewText>,
    )

    const element = baseElement.querySelector('#preview-text')
    expect(element).not.toBeNull()
    expect(element).toHaveTextContent(value)
  })

  it('is display: none', () => {
    const value = faker.lorem.paragraph()
    const { baseElement } = render(
      <PreviewText initialValue={value}>
        <PreviewTextHtml />
      </PreviewText>,
    )

    const element = baseElement.querySelector('#preview-text')
    expect(element).not.toBeNull()
    const attribute = element!.attributes.getNamedItem('style')
    expect(attribute?.value).toEqual('display: none;')
  })
})
