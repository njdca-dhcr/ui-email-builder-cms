import { render } from '@testing-library/react'
import React from 'react'
import { BoxColor, SelectBoxColor } from '../SelectBoxColor'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

describe('SelectBoxColor', () => {
  it('has all four options', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByRole } = render(
      <SelectBoxColor
        labelId={faker.lorem.word()}
        value={BoxColor.GoverningGray}
        onChange={jest.fn()}
      />,
    )
    const combobox = getByRole('combobox')
    expect(combobox).toHaveTextContent('Governing Gray')

    await user.click(combobox)

    expect(queryByRole('option', { name: 'Benefit Blue' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Granted Green' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Governing Gray' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Yielding Yellow' })).not.toBeNull()
  })

  it('handles changes', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { getByRole } = render(
      <SelectBoxColor
        labelId={faker.lorem.word()}
        value={BoxColor.GoverningGray}
        onChange={handleChange}
      />,
    )

    await user.click(getByRole('combobox'))

    expect(handleChange).not.toHaveBeenCalled()
    await user.click(getByRole('option', { name: 'Benefit Blue' }))
    expect(handleChange).toHaveBeenCalledWith(BoxColor.BenefitBlue)
  })
})
