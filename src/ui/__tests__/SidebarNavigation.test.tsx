import { render } from '@testing-library/react'
import React from 'react'
import { SidebarNavigation } from '../SidebarNavigation'

describe('SidebarNavigation', () => {
  it('displays a home link', () => {
    const { getByText } = render(<SidebarNavigation />)
    const link: HTMLAnchorElement = getByText('Home') as any
    expect(link.tagName).toEqual('A')
    expect(link.href).toEqual('http://localhost/')
  })

  it('displays a library link', () => {
    const { getByText } = render(<SidebarNavigation />)
    const link: HTMLAnchorElement = getByText('Library') as any
    expect(link.tagName).toEqual('A')
    expect(link.href).toEqual('http://localhost/library')
  })

  it('displays a tips and tricks link', () => {
    const { getByText } = render(<SidebarNavigation />)
    const link: HTMLAnchorElement = getByText('Tips & Tricks') as any
    expect(link.tagName).toEqual('A')
    expect(link.href).toEqual('http://localhost/tips-and-tricks')
  })
})
