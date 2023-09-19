import React from 'react'
import { render } from '@testing-library/react'
import { Navigation } from '../Navigation'

describe('Navigation', () => {
  it('displays navigation links', () => {
    const { getByText } = render(<Navigation />)
    const firstLink: HTMLAnchorElement = getByText('Email Template') as any
    expect(firstLink.href).toEqual('http://localhost/email-templates/email-template')

    const secondLink: HTMLAnchorElement = getByText('Another Email Template') as any
    expect(secondLink.href).toEqual('http://localhost/email-templates/another-email-template')
  })
})
