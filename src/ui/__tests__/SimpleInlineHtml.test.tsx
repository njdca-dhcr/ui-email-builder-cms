import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React from 'react'
import { SimpleInlineHtml } from '../SimpleInlineHtml'

describe('SimpleInlineHtml', () => {
  it('allows b tags', () => {
    const html = `${faker.lorem.word()}<b>${faker.lorem.word()}</b>${faker.lorem.word()}`
    const { baseElement } = render(<SimpleInlineHtml html={html} />)
    expect(baseElement).toContainHTML(html)
  })

  it('allows strong tags', () => {
    const html = `${faker.lorem.word()}<strong>${faker.lorem.word()}</strong>${faker.lorem.word()}`
    const { baseElement } = render(<SimpleInlineHtml html={html} />)
    expect(baseElement).toContainHTML(html)
  })

  it('allows u tags', () => {
    const html = `${faker.lorem.word()}<u>${faker.lorem.word()}</u>${faker.lorem.word()}`
    const { baseElement } = render(<SimpleInlineHtml html={html} />)
    expect(baseElement).toContainHTML(html)
  })

  it('does not allow script tags', () => {
    const html = `${faker.lorem.word()}<script>${faker.lorem.word()}</script>${faker.lorem.word()}`
    const { baseElement } = render(<SimpleInlineHtml html={html} />)
    expect(baseElement).not.toContainHTML(html)
    expect(baseElement.innerHTML).not.toContain('script')
  })
})
