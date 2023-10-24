import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditDepartmentSeal } from '../EditDepartmentSeal'

describe('EditDepartmentSeal', () => {
  it('provides a dropdown for selecting the department seal', async () => {
    const user = userEvent.setup()

    const { queryByRole, getByRole } = render(<EditDepartmentSeal />)
    let button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('SHIELD')

    await user.click(button!)
    expect(queryByRole('option', { name: 'Alabama Department of Labor Logo' })).not.toBeNull()
    expect(
      queryByRole('option', { name: 'Oregon Bureau of Labor & Industries Logo' }),
    ).not.toBeNull()
    expect(queryByRole('option', { name: 'Wyoming Workforce Services' })).not.toBeNull()

    await user.click(getByRole('option', { name: 'Oregon Bureau of Labor & Industries Logo' }))
    button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Oregon Bureau of Labor & Industries Logo')
  })
})
