import React from 'react'
import { render } from '@testing-library/react'
import TipsAndTricksPage from '../tips-and-tricks'
import { TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'

describe('Library page', () => {
  it('is displayed in a layout', () => {
    const { baseElement } = render(<TipsAndTricksPage />)
    expect(baseElement.querySelector('.new-layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const { queryByTestId } = render(<TipsAndTricksPage />)
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })
})
