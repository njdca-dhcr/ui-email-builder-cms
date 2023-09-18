import React from 'react'
import { render } from '@testing-library/react'
import IndexPage from '../index'
import { TEST_ID as layoutTestId } from '../../ui/Layout'
import { useStaticQuery } from 'gatsby'

describe('index - Root page', () => {
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

  it('is displayed in a layout', () => {
    const { queryByTestId } = render(<IndexPage />)
    expect(queryByTestId(layoutTestId)).not.toBeNull()
  })
})
