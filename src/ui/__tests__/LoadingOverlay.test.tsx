import { render } from '@testing-library/react'
import React from 'react'
import { LoadingOverlay } from '../LoadingOverlay'
import { faker } from '@faker-js/faker'

describe('LoadingOverlay', () => {
  it('renders the description', () => {
    const description = faker.lorem.paragraph()
    const { baseElement } = render(<LoadingOverlay description={description} />)
    expect(baseElement).toHaveTextContent(description)
  })
})
