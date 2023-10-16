import React from 'react'
import { render } from '@testing-library/react'
import Settings from '../settings'
import { TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

describe('Settings page', () => {
  it('is displayed in a layout', () => {
    const { baseElement } = render(<Settings />)
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const { queryByTestId } = render(<Settings />)
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  describe('disclaimer', () => {
    it('is editable', async () => {
      const user = userEvent.setup()
      const value = faker.lorem.paragraph()
      const { queryByText, getByLabelText } = render(<Settings />)

      const disclaimerField = getByLabelText('Disclaimer')
      await user.clear(disclaimerField)
      await user.type(disclaimerField, value)
      expect(queryByText(value)).not.toBeNull()
      expect(localStorage.getItem('disclaimer')).toEqual(`"${value}"`)
    })
  })
})
