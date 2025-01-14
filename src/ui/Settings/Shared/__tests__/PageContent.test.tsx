import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import { PageContent } from '../PageContent'

describe('PageContent', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <PageContent>
        <span>{text}</span>
      </PageContent>,
    )
    expect(baseElement).toContainHTML(`<span>${text}</span>`)
  })

  it('accepts a className', async () => {
    const className = faker.lorem.word()
    const { baseElement } = render(
      <PageContent className={className}>
        <span />
      </PageContent>,
    )
    expect(baseElement.querySelector(`.${className}`)).toBeTruthy()
  })
})
