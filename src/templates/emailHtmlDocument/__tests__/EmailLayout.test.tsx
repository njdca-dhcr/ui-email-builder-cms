import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import { EmailLayout } from '../EmailLayout'

describe('EmailLayout', () => {
  let spy: jest.SpyInstance

  beforeEach(() => {
    spy = jest.spyOn(console, 'error')
    spy.mockImplementation(() => {})
  })

  afterEach(() => {
    spy.mockReset()
  })

  describe('when given an html string', () => {
    it('displays the given html string', () => {
      const html = `<div><section>${faker.lorem.paragraph()}</section></div>`
      const { baseElement } = render(<EmailLayout html={html} title={faker.lorem.word()} />)
      expect(baseElement.querySelector('body')).toContainHTML(html)
    })

    it('accepts a title', () => {
      const title = faker.lorem.word()
      const { baseElement } = render(<EmailLayout html={'<div></div>'} title={title} />)
      expect(baseElement.querySelector('title')).toHaveTextContent(title)
    })
  })

  describe('when given children', () => {
    it('displays the given children', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <EmailLayout title={faker.lorem.word()}>
          <div>
            <section>{text}</section>
          </div>
        </EmailLayout>,
      )
      expect(baseElement.querySelector('body div section')).toHaveTextContent(text)
    })

    it('accepts a title', () => {
      const title = faker.lorem.word()
      const { baseElement } = render(
        <EmailLayout title={title}>
          <div />
        </EmailLayout>,
      )
      expect(baseElement.querySelector('title')).toHaveTextContent(title)
    })
  })
})
