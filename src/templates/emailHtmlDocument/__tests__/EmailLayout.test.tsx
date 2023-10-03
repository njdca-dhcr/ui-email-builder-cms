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

  it('displays the given html string', () => {
    const html = `<div><section>${faker.lorem.paragraph()}</section></div>`
    const { baseElement } = render(<EmailLayout html={html} />)
    expect(baseElement.querySelector('body')).toContainHTML(html)
  })
})
