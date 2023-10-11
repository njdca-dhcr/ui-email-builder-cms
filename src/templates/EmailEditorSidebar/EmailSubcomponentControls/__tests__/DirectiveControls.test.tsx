import React from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { DirectiveVariant } from 'src/templates/EmailTemplateSubComponents/Directive'
import { faker } from '@faker-js/faker'
import { DirectiveControls } from '../DirectiveControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'

describe('DirectiveControls', () => {
  it('provides a dropdown for selecting a variant', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByRole } = render(
      <EmailPartsContent>
        <DirectiveControls componentId={faker.lorem.word()} id={faker.lorem.word()} />,
      </EmailPartsContent>,
    )
    let button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('One Step')

    await user.click(button!)
    await user.click(getByRole('option', { name: 'Pay Online' }))

    button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Pay Online')
  })
})
