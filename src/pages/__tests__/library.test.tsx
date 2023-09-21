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
})
