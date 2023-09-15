import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { Footer, TEST_ID } from '../Footer'

describe('Footer', () => {
  it('displays the description', () => {
    const description = faker.lorem.paragraph()
    const { getByTestId } = render(<Footer description={description} />)
    expect(getByTestId(TEST_ID)).toHaveTextContent(description)
  })
})
