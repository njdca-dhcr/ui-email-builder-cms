import React from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { DirectiveControls } from '../DirectiveControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'

describe('DirectiveControls', () => {
  it('provides a toggle for showing the title', async () => {
    const user = userEvent.setup()
    const { queryByRole } = render(
      <EmailPartsContent>
        <DirectiveControls
          emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Directive' })}
        />
        ,
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
        <DirectiveControls
          emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Directive' })}
        />
        ,
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
