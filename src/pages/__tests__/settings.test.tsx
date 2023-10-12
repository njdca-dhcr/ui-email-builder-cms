import React from 'react'
import { render } from '@testing-library/react'
import Settings from '../settings'
import { TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'

describe('Library page', () => {
  it('is displayed in a layout', () => {
    const { baseElement } = render(<Settings />)
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const { queryByTestId } = render(<Settings />)
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })
})
