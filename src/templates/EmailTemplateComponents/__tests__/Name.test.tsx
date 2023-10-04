import React from 'react'
import { Name } from '../Name'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import {
  buildEmailTemplateComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
} from 'src/testHelpers'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'
import { buildComponentKey } from 'src/utils/emailPartKeys'

describe('Name', () => {
  let id: string
  let emailComponent: EmailTemplate.Component<'Name'>

  beforeEach(() => {
    id = faker.lorem.word()
    emailComponent = buildEmailTemplateComponent('Name')
  })

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Name emailComponent={emailComponent} id={id}>
        <tr>
          <td>{text}</td>
        </tr>
      </Name>,
      { wrapper: emailPartWrapper },
    )

    expect(baseElement).toContainHTML(`<tr><td>${text}</td></tr>`)
  })

  it('displays an editable name', async () => {
    const user = userEvent.setup()
    const { queryByText, getByLabelText, baseElement } = render(
      <Name id={id} emailComponent={emailComponent}>
        {null}
      </Name>,
      {
        wrapper: emailPartWrapper,
      },
    )

    const key = buildComponentKey(id)
    const value = faker.lorem.words(4)
    const input = getByLabelText("Recipient's name")
    await user.clear(input)
    await user.type(input, value)

    expect(queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, baseElement)
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = render(
      <Name id={id} emailComponent={emailComponent}>
        {null}
      </Name>,
      { wrapper: emailPartWrapper },
    )
    const key = buildComponentKey(id)
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText("Recipient's name"))
    expectActiveEmailPartToBe(key, baseElement)
  })
})
