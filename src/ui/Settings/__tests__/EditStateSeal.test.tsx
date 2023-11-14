import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditStateSeal } from '../EditStateSeal'
import { StateSealValue } from 'src/templates/EmailTemplateComponents/StateSeal'
import { faker } from '@faker-js/faker'

describe('EditStateSeal', () => {
  const stored = (): StateSealValue => {
    const stored = localStorage.getItem('stateSeal') ?? '{}'
    return JSON.parse(stored)
  }

  it('has an editable state seal dropdown', async () => {
    const user = userEvent.setup()
    const { getByRole } = render(<EditStateSeal />)

    const stateSealSelect = () => getByRole('button')
    expect(stateSealSelect()).toHaveTextContent('US')

    await user.click(stateSealSelect())
    await user.click(getByRole('option', { name: 'California' }))

    expect(stateSealSelect()).toHaveTextContent('California')
    expect(stored().stateSealKey).toEqual('California')
  })

  it('has an editable additional disclaimer text', async () => {
    const user = userEvent.setup()
    const { getByLabelText } = render(<EditStateSeal />)
    const value = faker.lorem.paragraph()
    const additionalDisclaimerField = () => getByLabelText('Additional Disclaimer')

    await user.clear(additionalDisclaimerField())
    await user.type(additionalDisclaimerField(), value)
    expect(additionalDisclaimerField()).toHaveTextContent(value)
  })
})
