import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { Header, TEST_ID } from '../Header'

describe('Header', () => {
  it('displays the description', () => {
    const description = faker.lorem.paragraph()
    const { getByTestId } = render(<Header description={description} />)
    expect(getByTestId(TEST_ID)).toHaveTextContent(description)
  })
})
