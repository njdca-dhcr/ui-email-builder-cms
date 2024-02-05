import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { UswdsIconSelect } from '../UswdsIconSelect'
import { faker } from '@faker-js/faker'

jest.mock('src/ui/UswdsIcon', () => {
  return {
    ...jest.requireActual('src/ui/UswdsIcon'),
    UswdsIcon: () => <div>Image Placeholder</div>,
  }
})

describe('UswdsIconSelect', () => {
  it('displays the icons in the button and list options', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByRole } = render(
      <UswdsIconSelect
        onChange={jest.fn()}
        value="AccessibilityNew"
        labelId={faker.lorem.word()}
      />,
    )
    const button = getByRole('button')
    expect(button).toHaveTextContent(/Image Placeholder/)
    await user.click(button)
    const option = queryByRole('option', { name: 'Image Placeholder Zoom Out' })
    expect(option).not.toBeNull()
  })
})
