import React from 'react'
import { ProgramName } from '../ProgramName'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { EmailParts } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import {
  buildUniqueEmailSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
} from 'src/testHelpers'

describe('ProgramName', () => {
  let emailSubComponent: EmailParts.ProgramName

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'ProgramName' })
  })

  it('is editable', async () => {
    const user = userEvent.setup()
    const { queryByText, getByLabelText, baseElement } = render(
      <ProgramName emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )

    const key = emailSubComponent.id
    const value = faker.lorem.words(4)
    const input = getByLabelText('Program name')
    await user.clear(input)
    await user.type(input, value)

    expect(queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, baseElement)
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = render(
      <ProgramName emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const key = emailSubComponent.id
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Program name'))
    expectActiveEmailPartToBe(key, baseElement)
  })
})
