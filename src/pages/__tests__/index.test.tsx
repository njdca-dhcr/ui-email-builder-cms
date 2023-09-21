import React from 'react'
import { render } from '@testing-library/react'
import IndexPage from '../index'
import { TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'

describe('index - Root page', () => {
  it('is displayed in a layout', () => {
    const { baseElement } = render(<IndexPage />)
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const { queryByTestId } = render(<IndexPage />)
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })
})
