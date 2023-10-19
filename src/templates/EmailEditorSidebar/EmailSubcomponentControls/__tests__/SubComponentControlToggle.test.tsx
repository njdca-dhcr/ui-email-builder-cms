import React from 'react'
import { SubComponentControlToggle } from '../SubComponentControlToggle'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('SubComponentControlToggle', () => {
  let subComponentId: string

  beforeEach(() => {
    subComponentId = faker.lorem.word()
  })

  it('can toggle a value', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const label = faker.lorem.word()
    const { getByLabelText } = render(
      <SubComponentControlToggle
        subComponentId={subComponentId}
        label={label}
        onChange={handleChange}
        value={true}
      />,
    )

    expect(handleChange).not.toHaveBeenCalled()
    await user.click(getByLabelText(label))
    expect(handleChange).toHaveBeenCalledWith(false)
  })

  it('accepts a className', () => {
    const { baseElement } = render(
      <SubComponentControlToggle
        className="my-class"
        subComponentId={subComponentId}
        label={faker.lorem.word()}
        onChange={jest.fn()}
        value={true}
      />,
    )

    expect(baseElement.querySelector('.label-and-toggle.my-class'))
  })

  it('creates a unique id for the toggle', () => {
    const label = faker.lorem.word()
    const { getByLabelText } = render(
      <SubComponentControlToggle
        subComponentId={subComponentId}
        label={label}
        onChange={jest.fn()}
        value={true}
      />,
    )
    const toggle = getByLabelText(label)
    expect(toggle.id).toEqual(`toggle-${subComponentId}-${label}`)
  })
})
