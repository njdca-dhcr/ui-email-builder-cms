import React from 'react'
import { Name } from '../Name'
import { render } from '@testing-library/react'
import { EmailParts } from 'src/appTypes'
import {
  buildUniqueEmailComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
} from 'src/testHelpers'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('Name', () => {
  let id: string
  let emailComponent: EmailParts.Name

  beforeEach(() => {
    id = faker.lorem.word()
    emailComponent = buildUniqueEmailComponent('Name')
  })

  it('displays an editable name', async () => {
    const user = userEvent.setup()
    const { queryByText, getByLabelText, baseElement } = render(
      <Name emailComponent={emailComponent}>{null}</Name>,
      {
        wrapper: emailPartWrapper,
      },
    )

    const value = faker.lorem.words(4)
    const input = getByLabelText("Recipient's name")
    await user.clear(input)
    await user.type(input, value)

    expect(queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(emailComponent.id, baseElement)
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = render(
      <Name emailComponent={emailComponent}>{null}</Name>,
      { wrapper: emailPartWrapper },
    )
    expectActiveEmailPartToNotBe(emailComponent.id, baseElement)
    await user.click(getByLabelText("Recipient's name"))
    expectActiveEmailPartToBe(emailComponent.id, baseElement)
  })

  it('can be read only', async () => {
    const { baseElement } = render(
      <Name emailComponent={emailComponent} readOnly>
        {null}
      </Name>,
      {
        wrapper: emailPartWrapper,
      },
    )
    expect(baseElement.querySelectorAll('[readonly]')).toHaveLength(1)
  })
})
