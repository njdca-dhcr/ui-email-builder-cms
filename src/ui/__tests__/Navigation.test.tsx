import React from 'react'
import { render } from '@testing-library/react'
import { Navigation } from '../Navigation'
import { urlFor } from 'src/testHelpers'

describe('Navigation', () => {
  it('displays navigation links', () => {
    const { getByText } = render(<Navigation />)
    const firstLink: HTMLAnchorElement = getByText('Email Template') as any
    expect(firstLink.href).toEqual(urlFor('/email-templates/email-template'))

    const secondLink: HTMLAnchorElement = getByText('Another Email Template') as any
    expect(secondLink.href).toEqual(urlFor('/email-templates/another-email-template'))
  })
})
