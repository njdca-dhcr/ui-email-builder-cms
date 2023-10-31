import React from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { DirectiveVariant } from 'src/templates/EmailTemplateSubComponents/Directive'
import { faker } from '@faker-js/faker'
import { DirectiveControls } from '../DirectiveControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'

describe('DirectiveControls', () => {
  it('provides a toggle for showing the title', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByRole } = render(
      <EmailPartsContent>
        <DirectiveControls componentId={faker.lorem.word()} id={faker.lorem.word()} />,
      </EmailPartsContent>,
    )
    let toggle = queryByRole('switch')
    expect(toggle).not.toBeNull()
    expect(toggle).toBeChecked()

    await user.click(toggle!)
    toggle = queryByRole('switch')
    expect(toggle).not.toBeNull()
    expect(toggle).not.toBeChecked()
  })

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

  it('provides an input for the link href', async () => {
    const user = userEvent.setup()
    const { queryByRole } = render(
      <EmailPartsContent>
        <DirectiveControls componentId={faker.lorem.word()} id={faker.lorem.word()} />,
      </EmailPartsContent>,
    )

    let input = queryByRole('textbox')
    expect(input).not.toBeNull()

    const newUrl = faker.internet.url()
    await user.clear(input!)
    await user.type(input!, newUrl)
    input = queryByRole('textbox')
    expect(input).not.toBeNull()
    expect(input).toHaveValue(newUrl)
  })
})
