import { render } from '@testing-library/react'
import React from 'react'
import { RichTextElement, RichTextLeaf } from '../RichText'
import { faker } from '@faker-js/faker'

describe('RichTextElement', () => {
  describe('link element', () => {
    it('is an "a" tag', () => {
      const text = faker.lorem.paragraph()
      const url = faker.internet.url({ appendSlash: true })
      const { getByRole } = render(
        <RichTextElement element={{ type: 'link', url }} data-foo="foo">
          <span>{text}</span>
        </RichTextElement>,
      )
      const link: HTMLAnchorElement = getByRole('link') as any
      expect(link.href).toEqual(url)
      expect(link.rel).toEqual('noopener noreferrer')
      expect(link.target).toEqual('_blank')
      expect(link).toContainHTML(`<span>${text}</span>`)
      expect(link.dataset['foo']).toEqual('foo')
    })
  })

  describe('paragraph element', () => {
    it('is a "p" tag', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <RichTextElement element={{ type: 'paragraph' }} data-foo="foo">
          <span>{text}</span>
        </RichTextElement>,
      )
      const paragraph = baseElement.querySelector('p')
      expect(paragraph).not.toBeNull()
      expect(paragraph).toContainHTML(`<span>${text}</span>`)
      expect(paragraph!.dataset['foo']).toEqual('foo')
    })
  })
})

describe('RichTextLeaf', () => {
  it('passes through props and children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <RichTextLeaf leaf={{ text: 'foo' }} data-foo="foo" className="my-leaf">
        <span>{text}</span>
      </RichTextLeaf>,
    )
    const element: HTMLElement | null = baseElement.querySelector('.my-leaf')
    expect(element).not.toBeNull()
    expect(element).toContainHTML(`<span>${text}</span>`)
    expect(element!.dataset['foo']).toEqual('foo')
  })

  it('can be bold', () => {
    const { baseElement } = render(
      <RichTextLeaf leaf={{ text: 'foo', bold: true }} className="my-leaf">
        content
      </RichTextLeaf>,
    )
    const element: HTMLElement | null = baseElement.querySelector('.my-leaf')
    expect(element).not.toBeNull()
    expect(element).toContainHTML(`<strong>content</strong>`)
  })

  it('can be italic', () => {
    const { baseElement } = render(
      <RichTextLeaf leaf={{ text: 'foo', italic: true }} className="my-leaf">
        content
      </RichTextLeaf>,
    )
    const element: HTMLElement | null = baseElement.querySelector('.my-leaf')
    expect(element).not.toBeNull()
    expect(element).toContainHTML(`<em>content</em>`)
  })

  it('can be underlined', () => {
    const { baseElement } = render(
      <RichTextLeaf leaf={{ text: 'foo', underline: true }} className="my-leaf">
        content
      </RichTextLeaf>,
    )
    const element: HTMLElement | null = baseElement.querySelector('.my-leaf')
    expect(element).not.toBeNull()
    expect(element).toContainHTML(`<u>content</u>`)
  })

  it('can be different combinations of bold/italic/underlined', () => {
    const { baseElement } = render(
      <RichTextLeaf
        leaf={{ text: 'foo', underline: true, bold: true, italic: true }}
        className="my-leaf"
      >
        content
      </RichTextLeaf>,
    )
    const element: HTMLElement | null = baseElement.querySelector('.my-leaf')
    expect(element).not.toBeNull()
    expect(element).toContainHTML(`<u><em><strong>content</strong></em></u>`)
  })
})
