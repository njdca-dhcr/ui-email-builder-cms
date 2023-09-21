import React from 'react'
import { render } from '@testing-library/react'
import LibraryPage from '../library'
import { TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'

describe('Library page', () => {
  it('is displayed in a layout', () => {
    const { baseElement } = render(<LibraryPage />)
    expect(baseElement.querySelector('.new-layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const { queryByTestId } = render(<LibraryPage />)
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  it('displays all of the templates', () => {
    const { getByText } = render(<LibraryPage />)
    const firstLink: HTMLAnchorElement = getByText('Email Template') as any
    expect(firstLink.href).toEqual('http://localhost/email-templates/email-template')

    const secondLink: HTMLAnchorElement = getByText('Another Email Template') as any
    expect(secondLink.href).toEqual('http://localhost/email-templates/another-email-template')
  })
})
