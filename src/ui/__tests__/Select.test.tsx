import { render } from '@testing-library/react'
import React from 'react'
import { Select } from '../Select'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

describe('Select', () => {
  it('displays the selected value label', () => {
    const options = [
      { value: '1', label: 'A' },
      { value: '2', label: 'B' },
      { value: '3', label: 'C' },
    ]
    const { queryByRole } = render(
      <Select
        labelId={faker.lorem.word()}
        onChange={jest.fn()}
        value={options[0].value}
        options={options}
      />,
    )
    const button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('A')
  })

  it('is labeled by the given label id', () => {
    const options = [
      { value: '1', label: 'A' },
      { value: '2', label: 'B' },
      { value: '3', label: 'C' },
    ]
    const labelId = faker.lorem.word()
    const { baseElement } = render(
      <Select labelId={labelId} onChange={jest.fn()} value={options[0].value} options={options} />,
    )
    expect(baseElement.querySelector(`[aria-labelledby="${labelId}"]`)).not.toBeNull()
  })

  it('handles changes', async () => {
    const user = userEvent.setup()
    const options = [
      { value: '1', label: 'A' },
      { value: '2', label: 'B' },
      { value: '3', label: 'C' },
    ]
    const handleChange = jest.fn()
    const { getByRole } = render(
      <Select
        labelId={faker.lorem.word()}
        onChange={handleChange}
        value={options[0].value}
        options={options}
      />,
    )
    await user.click(getByRole('button', { name: 'A' }))
    await user.click(getByRole('option', { name: 'B' }))

    expect(handleChange).toHaveBeenCalledWith('2')
  })
})
