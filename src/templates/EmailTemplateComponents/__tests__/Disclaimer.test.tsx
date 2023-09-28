import React from 'react'
import { Disclaimer } from '../Disclaimer'
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

describe('Disclaimer', () => {
  let id: string
  let emailComponent: EmailTemplate.Component<'Disclaimer'>

  beforeEach(() => {
    id = faker.lorem.word()
    emailComponent = buildEmailTemplateComponent('Disclaimer')
  })

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Disclaimer emailComponent={emailComponent} id={id}>
        <tr>
          <td>{text}</td>
        </tr>
      </Disclaimer>,
      { wrapper: emailPartWrapper },
    )

    expect(baseElement).toContainHTML(`<tr><td>${text}</td></tr>`)
  })

  it('displays an editable Disclaimer', async () => {
    const user = userEvent.setup()
    const { queryByText, getByTestId, baseElement } = render(
      <Disclaimer id={id} emailComponent={emailComponent}>
        {null}
      </Disclaimer>,
      {
        wrapper: emailPartWrapper,
      },
    )

    const key = buildComponentKey(id)
    const value = faker.lorem.words(4)
    const input = getByTestId('disclaimer')
    await user.clear(input)
    await user.type(input, value)

    expect(queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, baseElement)
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByTestId, baseElement } = render(
      <Disclaimer id={id} emailComponent={emailComponent}>
        {null}
      </Disclaimer>,
      { wrapper: emailPartWrapper },
    )
    const key = buildComponentKey(id)
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByTestId('disclaimer'))
    expectActiveEmailPartToBe(key, baseElement)
  })
})
