import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditDepartmentSeal } from '../EditDepartmentSeal'
import { asMock } from 'src/testHelpers'
import { isAllStatesMode } from 'src/utils/appMode'

jest.mock('src/utils/appMode', () => {
  const actual = jest.requireActual('src/utils/appMode')
  return {
    ...actual,
    isAllStatesMode: jest.fn(),
  }
})

describe('EditDepartmentSeal', () => {
  beforeEach(() => {
    localStorage.removeItem('department-seal')
  })

  describe('when in NJ mode', () => {
    it('only provides New Jersey related state seals in the dropdown', async () => {
      asMock(isAllStatesMode).mockReturnValue(false)
      const user = userEvent.setup()
      const { getByRole, queryByRole } = render(<EditDepartmentSeal />)
      const button = (): Element => getByRole('button')
      expect(button()).toHaveTextContent('New Jersey Department of Labor Logo')

      await user.click(button())
      expect(queryByRole('option', { name: 'Alabama Department of Labor Logo' })).toBeNull()
      expect(queryByRole('option', { name: 'Oregon Bureau of Labor & Industries Logo' })).toBeNull()
      expect(queryByRole('option', { name: 'Wyoming Workforce Services' })).toBeNull()

      await user.click(getByRole('option', { name: 'New Jersey Department of Labor Blue Logo' }))
      expect(button()).toHaveTextContent('New Jersey Department of Labor Blue Logo')
    })
  })

  describe('when in all states mode', () => {
    it('provides a dropdown for selecting the department seal', async () => {
      asMock(isAllStatesMode).mockReturnValue(true)
      const user = userEvent.setup()
      const { getByRole, queryByRole } = render(<EditDepartmentSeal />)
      const button = (): Element => getByRole('button')
      expect(button()).toHaveTextContent('US Department of Labor Color Logo')

      await user.click(button())
      expect(queryByRole('option', { name: 'Alabama Department of Labor Logo' })).not.toBeNull()
      expect(
        queryByRole('option', { name: 'Oregon Bureau of Labor & Industries Logo' }),
      ).not.toBeNull()
      expect(queryByRole('option', { name: 'Wyoming Workforce Services' })).not.toBeNull()

      await user.click(getByRole('option', { name: 'Wyoming Workforce Services' }))
      expect(button()).toHaveTextContent('Wyoming Workforce Services')
    })
  })
})
