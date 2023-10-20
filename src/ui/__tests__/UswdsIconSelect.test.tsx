import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { UswdsIconSelect } from '../UswdsIconSelect'
import { faker } from '@faker-js/faker'

describe('UswdsIconSelect', () => {
  it('is a select with all of the icon options', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { getByRole, queryByRole } = render(
      <UswdsIconSelect
        onChange={handleChange}
        value="AccessibilityNew"
        labelId={faker.lorem.word()}
      />,
    )
    const button = getByRole('button')
    expect(button).toHaveTextContent('AccessibilityNew')

    await user.click(button)

    expect(queryByRole('option', { name: 'AccessibilityNew' })).not.toBeNull()
    expect(queryByRole('option', { name: 'CalendarToday' })).not.toBeNull()
    expect(queryByRole('option', { name: 'ZoomOut' })).not.toBeNull()

    expect(handleChange).not.toHaveBeenCalled()
    await user.click(getByRole('option', { name: 'AttachFile' }))
    expect(handleChange).toHaveBeenCalledWith('AttachFile')
  })
})
