import React from 'react'
import { render } from '@testing-library/react'
import NotFoundPage from '../404'
import { TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'

describe('NotFound page', () => {
  it('is displayed in a layout', () => {
    const { baseElement } = render(<NotFoundPage {...({} as any)} />)
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const { queryByTestId } = render(<NotFoundPage {...({} as any)} />)
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })
})
