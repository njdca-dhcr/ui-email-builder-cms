import { render } from '@testing-library/react'
import React from 'react'
import { Dialog } from '../Dialog'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

describe('Dialog', () => {
  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup()
    const handleClose = jest.fn()
    const { getByRole } = render(<Dialog onClose={handleClose} />)
    const closeButton = getByRole('button', { name: 'Close' })
    expect(closeButton).toHaveFocus()

    expect(handleClose).not.toHaveBeenCalled()
    await user.click(closeButton)
    expect(handleClose).toHaveBeenCalled()
  })

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Dialog onClose={jest.fn()}>
        <p>{text}</p>
      </Dialog>,
    )
    expect(baseElement).toContainHTML(`<p>${text}</p>`)
  })
})
