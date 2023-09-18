import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { Navigation } from '../Navigation'
import { useStaticQuery } from 'gatsby'

describe('Navigation', () => {
  beforeEach(() => {
    ;(useStaticQuery as any).mockImplementation((): Queries.NavigationQuery => {
      return {
        emailTemplates: {
          edges: [
            {
              node: {
                id: '123',
                name: 'Email Template',
                parent: { id: '456', name: 'email-template' },
              },
            },
            {
              node: {
                id: '789',
                name: 'Another Email Template',
                parent: { id: '012', name: 'another-email-template' },
              },
            },
          ],
        },
      }
    })
  })

  it('displays navigation links', () => {
    const { getByText, debug } = render(<Navigation />)
    const firstLink: HTMLAnchorElement = getByText('Email Template') as any
    expect(firstLink.href).toEqual('http://localhost/email-templates/email-template')

    const secondLink: HTMLAnchorElement = getByText('Another Email Template') as any
    expect(secondLink.href).toEqual('http://localhost/email-templates/another-email-template')
  })
})
