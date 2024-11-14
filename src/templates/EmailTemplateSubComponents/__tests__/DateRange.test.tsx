import React from 'react'
import { DateRange } from '../DateRange'
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

describe('Date Range', () => {
  let emailSubComponent: EmailParts.DateRange

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'DateRange' })
  })

  it('is editable', async () => {
    const user = userEvent.setup()
    const { queryByText, getByLabelText, baseElement } = render(
      <DateRange emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )

    const value = faker.lorem.words(4)
    const key = emailSubComponent.id
    const input = getByLabelText('Date Range')
    await user.clear(input)
    await user.type(input, value)

    expect(queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, baseElement)
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = render(
      <DateRange emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const key = emailSubComponent.id
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Date Range'))
    expectActiveEmailPartToBe(key, baseElement)
  })
})
