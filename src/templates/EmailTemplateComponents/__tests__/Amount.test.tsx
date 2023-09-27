import React from 'react'
import { Amount } from '../Amount'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { buildEmailTemplateComponent, emailPartWrapper } from 'src/testHelpers'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('Amount', () => {
  let id: string
  let emailComponent: EmailTemplate.Component<'Amount'>

  beforeEach(() => {
    id = faker.lorem.word()
    emailComponent = buildEmailTemplateComponent('Amount')
  })

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Amount emailComponent={emailComponent} id={id}>
        <span>{text}</span>
      </Amount>,
      { wrapper: emailPartWrapper },
    )

    expect(baseElement).toContainHTML(`<span>${text}</span>`)
  })

  it('displays an editable total message', async () => {
    const user = userEvent.setup()
    const { queryByText, getByText } = render(
      <Amount id={id} emailComponent={emailComponent}>
        <span />
      </Amount>,
      {
        wrapper: emailPartWrapper,
      },
    )

    const value = faker.lorem.words(4)
    const input = getByText('You owe $200')
    await user.clear(input)
    await user.type(input, value)

    expect(queryByText(value)).not.toBeNull()
  })
})
