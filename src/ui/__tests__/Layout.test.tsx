import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { Layout } from '../Layout'
import { TEST_ID as navigationTestId } from '../Navigation'
import { useStaticQuery } from 'gatsby'

describe('Layout', () => {
  beforeEach(() => {
    ;(useStaticQuery as any).mockImplementation((): Queries.NavigationQuery => {
      return {
        emailTemplates: {
          edges: [
            {
              node: {
                id: '123',
                name: 'Email Template',
                parent: { id: '324', name: 'email-template' },
              },
            },
          ],
        },
      }
    })
  })

  it('renders its children', () => {
    const text = faker.lorem.paragraph()
    const { getByTestId } = render(
      <Layout>
        <div data-testid="test-text">{text}</div>
      </Layout>,
    )
    expect(getByTestId('test-text')).toHaveTextContent(text)
  })

  it('renders the navigation', () => {
    const text = faker.lorem.paragraph()
    const { queryByTestId } = render(
      <Layout>
        <div data-testid="test-text">{text}</div>
      </Layout>,
    )

    expect(queryByTestId(navigationTestId)).not.toBeNull()
  })
})
