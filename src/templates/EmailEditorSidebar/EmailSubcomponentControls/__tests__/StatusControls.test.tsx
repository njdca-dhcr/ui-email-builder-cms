import React from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { StatusControls } from '../StatusControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'

describe('StatusControls', () => {
  it('provides a dropdown for selecting a variant', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByRole } = render(
      <EmailPartsContent>
        <StatusControls componentId={faker.lorem.word()} id={faker.lorem.word()} />,
      </EmailPartsContent>,
    )
    let button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Overview')

    await user.click(button!)
    await user.click(getByRole('option', { name: 'Overview w/ Reason' }))

    button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Overview w/ Reason')
  })
})
