import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import { Layout } from '../Layout'

describe('Layout', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Layout>
        <span>{text}</span>
      </Layout>,
    )
    expect(baseElement).toContainHTML(`<span>${text}</span>`)
  })
})
