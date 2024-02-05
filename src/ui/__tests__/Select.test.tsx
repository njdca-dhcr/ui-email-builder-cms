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

  it('can use a react element as an option label', async () => {
    const user = userEvent.setup()
    const options = [
      { value: '1', label: 'A' },
      { value: '2', label: <div className="my-option">B</div> },
    ]
    const { baseElement, getByRole } = render(
      <Select
        labelId={faker.lorem.word()}
        onChange={jest.fn()}
        value={options[0].value}
        options={options}
      />,
    )

    user.click(getByRole('button'))
    expect(baseElement).toContainHTML('<div class="my-option">B</div>')
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

  it('allows for a custom render value', () => {
    const options = [
      { value: '1', label: 'A' },
      { value: '2', label: 'B' },
    ]
    const { getByRole } = render(
      <Select
        labelId={faker.lorem.word()}
        onChange={jest.fn()}
        value={options[0].value}
        options={options}
        renderValue={({ value, valueLabel }) => (
          <span className="custom-class">
            {value} - {valueLabel}
          </span>
        )}
      />,
    )
    const button = getByRole('button')
    expect(button).toContainHTML('<span class="custom-class">1 - A</span>')
  })
})
